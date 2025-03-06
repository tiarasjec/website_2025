"use client"
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { tiaraFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import CTA from "@/components/ui/cta";

gsap.registerPlugin(useGSAP);

const Hero: React.FC = () => {
  return (
    <div
     
      className={cn(
        "text-6xl md:text-9xl md:mr-10 min-h-screen z-10 flex flex-col justify-center items-center",
        tiaraFont.className
      )}
    >
      <div className="flex mr-4 items-center">
        <span className="text-white">Ti</span>
        <span style={{ color: "#EB1C2C" }}>ar</span>
        <span className='text-white'>a </span>
        <span style={{ color: "#EB1C2C" }}>&apos;</span>
        <span className='text-white'>25 </span>
      </div>
      <CTA/>
    </div>
  );
};

export default Hero;