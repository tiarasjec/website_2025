"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { tiaraFont } from "@/lib/fonts";
import Card from "@/components/ui/3dcard";
import ReactLenis from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Events: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const scrollTriggers = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const checkDeviceType = () => setIsMobile(window.innerWidth < 1024);
    checkDeviceType();
    window.addEventListener("resize", checkDeviceType);
    return () => window.removeEventListener("resize", checkDeviceType);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const cards = cardRef.current.filter(Boolean);

      // Kill only relevant ScrollTriggers instead of all
      scrollTriggers.current.forEach((trigger) => trigger.kill());
      scrollTriggers.current = [];

      if (isMobile) {
        const cardsContainer = containerRef.current.querySelector(".cards") as HTMLElement;
        cardsContainer.innerHTML = "";
        cardsContainer.style.height = `${cards.length * 80}vh`;

        cards.forEach((card, index) => {
          if (!card) return;

          const cardSection = document.createElement("div");
          cardSection.className = `card-section card-section-${index}`;
          cardSection.style.height = "80vh";
          cardSection.style.width = "100%";
          cardSection.style.position = "relative";
          cardsContainer.appendChild(cardSection);
          cardSection.appendChild(card);

          gsap.set(card, {
            position: "absolute",
            top: "50%",
            left: "50%",
            xPercent: -50,
            yPercent: -50,
            rotation: 0,
          });

          const frontEl = card.querySelector(".flip-card-front") as HTMLElement;
          const backEl = card.querySelector(".flip-card-back") as HTMLElement;

          if (frontEl && backEl) {
            const trigger = ScrollTrigger.create({
              trigger: cardSection,
              start: "center 55%",
              end: "center 45%",
              scrub: true,
              id: `flip-mobile-${index}`,
              onUpdate: (self) => {
                const progress = self.progress;
                gsap.to(frontEl, { rotateY: -180 * progress, ease: "power1.inOut" });
                gsap.to(backEl, { rotateY: 180 - 180 * progress, ease: "power1.inOut" });
              },
            });
            scrollTriggers.current.push(trigger);
          }
        });
      } else {
        const totalScrollHeight = window.innerHeight * 3;
        const position = [14, 38, 62, 86];
        const rotation = [-15, -7.5, 7.5, 15];

        const pinTrigger = ScrollTrigger.create({
          trigger: containerRef.current.querySelector(".cards") as HTMLElement | null,
          start: "top top",
          end: `+=${totalScrollHeight}`,
          pin: true,
          pinSpacing: true,
          id: "events-pin",
        });
        scrollTriggers.current.push(pinTrigger);

        const cardsContainer = containerRef.current.querySelector(".cards") as HTMLElement;
        cardsContainer.style.height = "100vh";

        cards.forEach((card, index) => {
          if (!card) return;

          if (card.parentElement?.classList.contains("card-section")) {
            cardsContainer.appendChild(card);
          }

          gsap.set(card, {
            position: "absolute",
            top: "50%",
            left: "50%",
            xPercent: -50,
            yPercent: -50,
          });

          const moveTrigger = ScrollTrigger.create({
            trigger: containerRef.current?.querySelector(".cards") as HTMLElement | null,
            start: "top top",
            end: `+=${window.innerHeight}`,
            scrub: 0.5,
            id: `spread-${index}`,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(card, { left: `${position[index]}%`, rotation: `${rotation[index]}` });
            },
          });
          scrollTriggers.current.push(moveTrigger);
        });

        const cardSections = cardsContainer.querySelectorAll(".card-section");
        cardSections.forEach((section) => section.remove());

        cards.forEach((card, index) => {
          if (!card) return;

          const frontEl = card.querySelector(".flip-card-front") as HTMLElement | null;
          const backEl = card.querySelector(".flip-card-back") as HTMLElement | null;

          if (!frontEl || !backEl) return;

          const staggerOffset = index * 0.05;
          const startOffset = 1 / 3 + staggerOffset;
          const endOffset = 2 / 3 + staggerOffset;

          const flipTrigger = ScrollTrigger.create({
            trigger: containerRef.current?.querySelector(".cards"),
            start: "top top",
            end: `+=${totalScrollHeight}`,
            scrub: 1,
            id: `rotate-flip-${index}`,
            onUpdate: (self) => {
              const progress = self.progress;
              if (progress >= startOffset && progress <= endOffset) {
                const animationProgress = (progress - startOffset) / (1 / 3);
                const frontRotation = -180 * animationProgress;
                const backRotation = 180 - 180 * animationProgress;
                const cardRotation = rotation[index] * (1 - animationProgress);

                gsap.to(frontEl, { rotateY: frontRotation, ease: "power1.out", backfaceVisibility: "hidden" });
                gsap.to(backEl, { rotateY: backRotation, ease: "power1.out", backfaceVisibility: "hidden" });
                gsap.to(card, { xPercent: -50, yPercent: -50, rotate: cardRotation, ease: "power1.out" });
              }
            },
          });
          scrollTriggers.current.push(flipTrigger);
        });
      }
    },
    { scope: containerRef, dependencies: [isMobile] }
  );

  useEffect(() => {
    return () => {
      scrollTriggers.current.forEach((trigger) => trigger.kill());
      scrollTriggers.current = [];

      if (containerRef.current) {
        const cardSections = containerRef.current.querySelectorAll(".card-section");
        cardSections.forEach((section) => section.remove());
      }
    };
  }, []);

  return (
    <ReactLenis root>
      <div className={cn("flex flex-wrap items-center text-3xl sm:text-4xl md:text-5xl justify-center text-center sm:text-left", tiaraFont.className)}>
        Events Category
      </div>
      <div className="container" ref={containerRef}>
        <section className="cards sec">
          {[...Array(4)].map((_, index) => (
            <Card key={index} id={`card-${index + 1}`} frontSrc="/assets/tiaracard.png" frontAlt="Card Image" backText="Your card here"
              ref={(el) => { cardRef.current[index] = el; }} />
          ))}
        </section>
      </div>
    </ReactLenis>
  );
};

export default Events;
