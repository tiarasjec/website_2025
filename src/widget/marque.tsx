"use client";
import React, { useRef, useEffect } from "react";
import { tiaraFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Marque = () => {
  const experienceRef = useRef<HTMLHeadingElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!experienceRef.current || !containerRef.current) return;
    const textWidth = experienceRef.current.offsetWidth;
    const windowWidth = window.innerWidth;
    const scrollDistance = textWidth - windowWidth + 40;

    gsap.to(experienceRef.current, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        scroller: "body",
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
        markers: true,
      },
    });
  }, []);

  return (
    <div ref={containerRef} className="h-screen z-10 page overflow-x-hidden flex items-center">
      <h1
        ref={experienceRef}
        className={cn(
          "text-[30vw] p-[20px] text-white whitespace-nowrap",
          tiaraFont.className
        )}
      >
        Experience The Reality
      </h1>
    </div>
  );
};

export default Marque;
