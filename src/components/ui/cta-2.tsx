"use client"

import { cn } from "@/lib/utils";
import { tiaraFont } from "@/lib/fonts";
import Image from "next/image";

export default function CTA2() {
  const text = "Get ready for an electrifying experience";
  const words = text.split(" ");

  return (
    <div className="w-full py-8 sm:py-10 md:py-12 px-4 max-w-7xl mx-auto">
      {/* Top Text */}
      <h2 className={cn("text-white text-4xl sm:text-5xl md:text-7xl text-center mb-8", tiaraFont.className)}>
        {words.map((word, index) => (
          <span
            key={index}
            className="inline-block mr-2 transition-transform duration-300 ease-out hover:scale-110 origin-bottom"
          >
            {word}
          </span>
        ))}
      </h2>
      
      {/* Main Content - Different layouts for mobile vs desktop */}
      <div className="w-full">
        {/* Mobile Layout (stacked: text then images side-by-side) */}
        <div className="md:hidden w-full flex flex-col items-center">
          {/* Center Text */}
          <div className="w-full mb-8">
            <p className="text-white text-lg text-center">
              An unforgettable event awaits you. Stay tuned for more surprises!
            </p>
          </div>
          
          {/* Images side by side */}
          <div className="flex flex-row justify-center gap-4">
            <Image
              src="/assets/dancing-removebg-preview.png"
              alt="CTA Image Left"
              width={140}
              height={140}
              className="max-w-full h-auto"
            />
            <Image
              src="/assets/robot_inverted-removebg-preview.png"
              alt="CTA Image Right"
              width={140}
              height={140}
              className="max-w-full h-auto"
            />
          </div>
        </div>
        
        {/* Desktop Layout (image - text - image) */}
        <div className="hidden md:flex md:flex-row items-center justify-center gap-6">
          {/* Left Image */}
          <div className="w-1/3 flex justify-end">
            <Image
              src="/assets/dancing-removebg-preview.png"
              alt="CTA Image Left"
              width={300}
              height={300}
              className="max-w-full h-auto"
            />
          </div>
          
          {/* Center Text */}
          <div className="w-1/3 lg:w-2/5 px-4">
            <p className="text-white text-lg text-center">
              An unforgettable event awaits you. Stay tuned for more surprises!
            </p>
          </div>
          
          {/* Right Image */}
          <div className="w-1/3 flex justify-start">
            <Image
              src="/assets/inverted_robot-removebg-preview.png"
              alt="CTA Image Right"
              width={300}
              height={300}
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}