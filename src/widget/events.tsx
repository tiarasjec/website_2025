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

const cardData = [
  {
    id: "card-1",
    frontSrc: "/assets/tiaracard.png",
    backSrc: "/assets/tech.jpg",
    frontAlt: "Technical",
    title: "Technical",
    backText:
      "Compete and showcase your tech skills.",
    buttonText: "Explore",
    buttonUrl: "/events/technical",
  },
  {
    id: "card-2",
    frontSrc: "/assets/tiaracard.png",
    backSrc: "/assets/nontech.jpg",
    frontAlt: "Non Technical",
    title: "NonTechnical",
    backText:
      "Engage in sports and exciting challenges.",
    buttonText: "Explore",
    buttonUrl: "/events/non_technical",
  },
  {
    id: "card-3",
    frontSrc: "/assets/tiaracard.png",
    backSrc: "/assets/cultural.jpg",
    frontAlt: "Cultural",
    title: "Cultural",
    backText:
      "Celebrating talent with music, dance, and art.",
    buttonText: "Explore",
    buttonUrl: "/events/cultural",
  },
  {
    id: "card-4",
    frontSrc: "/assets/tiaracard.png",
    backSrc: "/assets/mega1.jpg",
    frontAlt: "Mega",
    title: "Mega",
    backText:
      " Experience the biggest and most spectacular events.",
    buttonText: "Explore",
    buttonUrl: "/events/mega",
  },
]


const Events: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const scrollTriggers = useRef<ScrollTrigger[]>([]);

  // Initial card positions and rotations for desktop
  const INITIAL_POSITIONS = [50, 50, 50, 50];
  const SPREAD_POSITIONS = [14, 38, 62, 86];
  const INITIAL_ROTATIONS = [0, 0, 0, 0];
  const SPREAD_ROTATIONS = [-15, -7.5, 7.5, 15];

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

      // Kill existing scroll triggers
      scrollTriggers.current.forEach((trigger) => trigger.kill());
      scrollTriggers.current = [];

      if (isMobile) {
        // Existing mobile logic remains unchanged
        const cardsContainer = containerRef.current.querySelector(".cards") as HTMLElement;
        cardsContainer.innerHTML = "";
        cardsContainer.style.height = `${cards.length * 70}vh`;

        cards.forEach((card, index) => {
          if (!card) return;

          const cardSection = document.createElement("div");
          cardSection.className = `card-section card-section-${index}`;
          cardSection.style.height = "70vh";
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
              start: "center 70%",
              end: "center 90%",
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
        const cardsContainer = containerRef.current.querySelector(".cards") as HTMLElement;
        cardsContainer.style.height = "100vh";

        // Pin trigger to keep cards in view
        const pinTrigger = ScrollTrigger.create({
          trigger: cardsContainer,
          start: "top top",
          end: `+=${totalScrollHeight}`,
          pin: true,
          pinSpacing: true,
          id: "events-pin",
        });
        scrollTriggers.current.push(pinTrigger);

        // Reset initial card positions
        cards.forEach((card, index) => {
          if (!card) return;

          gsap.set(card, {
            position: "absolute",
            top: "50%",
            left: "50%",
            xPercent: -50,
            yPercent: -50,
            rotation: INITIAL_ROTATIONS[index],
          });
        });

        // Create scroll trigger for card spreading
        const spreadTrigger = ScrollTrigger.create({
          trigger: cardsContainer,
          start: "top top",
          end: `+=${window.innerHeight}`,
          scrub: 0.5,
          id: "card-spread",
          onUpdate: (self) => {
            const progress = self.progress;
            cards.forEach((card, index) => {
              if (!card) return;

              // Interpolate position and rotation
              const currentLeft = gsap.utils.interpolate(INITIAL_POSITIONS[index], SPREAD_POSITIONS[index], progress);
              const currentRotation = gsap.utils.interpolate(INITIAL_ROTATIONS[index], SPREAD_ROTATIONS[index], progress);

              gsap.to(card, { 
                left: `${currentLeft}%`, 
                rotation: currentRotation 
              });
            });
          },
          onLeave: () => {
            // Ensure cards stay at spread positions when scrolling down
            cards.forEach((card, index) => {
              if (!card) return;
              gsap.set(card, { 
                left: `${SPREAD_POSITIONS[index]}%`, 
                rotation: SPREAD_ROTATIONS[index] 
              });
            });
          },
          onEnterBack: () => {
            // Reset cards to initial positions when scrolling back up
            cards.forEach((card, index) => {
              if (!card) return;
              gsap.to(card, { 
                left: `${INITIAL_POSITIONS[index]}%`, 
                rotation: INITIAL_ROTATIONS[index],
                duration: 0.5
              });
            });
          }
        });
        scrollTriggers.current.push(spreadTrigger);

        // Card flipping logic
        cards.forEach((card, index) => {
          if (!card) return;

          const frontEl = card.querySelector(".flip-card-front") as HTMLElement | null;
          const backEl = card.querySelector(".flip-card-back") as HTMLElement | null;

          if (!frontEl || !backEl) return;

          const staggerOffset = index * 0.05;
          const startOffset = 1 / 3 + staggerOffset;
          const endOffset = 2 / 3 + staggerOffset;

          const flipTrigger = ScrollTrigger.create({
            trigger: cardsContainer,
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
                const cardRotation = SPREAD_ROTATIONS[index] * (1 - animationProgress);

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
        <div className="mt-28">
        <div className={cn("flex flex-wrap hover:cursor-crosshair  items-center text-3xl sm:text-5xl md:text-7xl justify-center text-center sm:text-left transition hover:scale-110 ease-out duration-300", tiaraFont.className)}>
          Event Categories
        </div>
        <div className="container" ref={containerRef}>
          <section className="cards sec">
            {cardData.map((card, index) => (
              <Card
                key={index}
                id={card.id}
                frontSrc={card.frontSrc}
                frontAlt={card.frontAlt}
                backText={card.backText}
                title={card.title}
                buttonText={card.buttonText}
                buttonUrl={card.buttonUrl}
                backSrc={card.backSrc}
                ref={(el) => {
                  cardRef.current[index] = el
                }}
              />
            ))}
          </section>
        </div>
        </div>
    </ReactLenis>
  );
};

export default Events;