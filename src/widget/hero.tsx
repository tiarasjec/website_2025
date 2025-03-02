"use client"
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { tiaraFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tiRef = useRef<HTMLSpanElement>(null);
  const arRef = useRef<HTMLSpanElement>(null);
  const aRef = useRef<HTMLSpanElement>(null);
  const apostropheRef = useRef<HTMLSpanElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // Initial state - all elements invisible
    gsap.set([tiRef.current, arRef.current, aRef.current, apostropheRef.current, yearRef.current], {
      opacity: 0,
      y: 100,
    });

    // Create timeline for sequenced animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate each part of the text
    tl.to(tiRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.8,
      delay: 0.5
    })
    .to(arRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.8,
    }, "-=0.6")
    .to(aRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.8,
    }, "-=0.6")
    .to(apostropheRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.6,
      yoyo: true,
    }, "-=0.4")
    .set(apostropheRef.current, { opacity: 1,y:0,scale:1 }) // Ensure it remains visible
   
    .to(yearRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.8,
    }, "-=0.5")
    .to([tiRef.current, arRef.current, aRef.current, apostropheRef.current, yearRef.current], {
      y: -20,
      duration: 0.5,
      stagger: 0.1,
      ease: "power1.inOut",
      yoyo: true,
      repeat: 1
    })
    .to([tiRef.current, arRef.current, aRef.current, apostropheRef.current, yearRef.current], {
      scale: 1.1,
      duration: 0.5,
      stagger: 0.1,
      ease: "power1.inOut",
      yoyo: true,
      repeat: 1
    });

  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "text-6xl md:text-9xl min-h-screen flex items-center justify-center",
        tiaraFont.className
      )}
    >
      <span ref={tiRef} className="text-white">Ti</span>
      <span ref={arRef} style={{ color: "#EB1C2C" }}>ar</span>
      <span ref={aRef} className='text-white'>a{" "}</span>
      <span ref={apostropheRef} style={{ color: "#EB1C2C" }}>'</span>
      <span ref={yearRef} className='text-white'>25{" "}</span>
    </div>
  );
};

export default Hero;
