"use client"
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { tiaraFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile device
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set on initial load
    checkDevice();
    
    // Update on resize
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useGSAP(() => {
    // Skip heavy animations on mobile
    if (!textRef.current) return;
    
    // Use a single timeline with fewer animations for better performance
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    
    // Target the text container instead of individual elements
    tl.fromTo(textRef.current.children, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        stagger: 0.1,
        clearProps: "transform" // Clean up after animation
      }
    );
    
    // Use a simpler bounce effect only for desktop
    if (!isMobile) {
      tl.to(textRef.current, {
        scale: 1.05,
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        delay: 0.5
      });
    }
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "text-6xl md:text-9xl min-h-screen z-10 flex items-center justify-center",
        tiaraFont.className
      )}
    >
      <div ref={textRef} className="flex items-center">
        <span className="text-white">Ti</span>
        <span style={{ color: "#EB1C2C" }}>ar</span>
        <span className='text-white'>a </span>
        <span style={{ color: "#EB1C2C" }}>&apos;</span>
        <span className='text-white'>25 </span>
      </div>
    </div>
  );
};

export default Hero;