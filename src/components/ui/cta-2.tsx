"use client"

import { cn } from "@/lib/utils"
import { tiaraFont } from "@/lib/fonts"
import Image from "next/image"
import TiltedCard from "./Tilted-card"

export default function CTA2() {
  const text = "Get ready for an electrifying experience";
  const words = text.split(" ");

  return (
    <div className="w-full py-8 sm:py-10 md:py-12 px-4 flex items-center justify-center max-w-7xl mx-auto">
      <div className="w-full flex flex-col items-center gap-8">
        {/* Heading text at the top */}
        <div className="relative flex flex-col items-center">
          <h2 className={cn("text-white text-5xl sm:text-6xl md:text-7xl text-center", tiaraFont.className)}>
            {words.map((word, index) => (
              <span 
                key={index} 
                className="inline-block mr-2 transition-transform duration-300 ease-out hover:scale-110 origin-bottom"
              >
                {word}
              </span>
            ))}
          </h2>
        </div>
        
        {/* Card and text section */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
          {/* TiltedCard on the left */}
          <div className="flex justify-center items-center  mb-6 sm:mb-0">
            <TiltedCard
              imageSrc="/assets/favicon_white.png"
              altText="Tiara25"
              captionText=""
              containerHeight="260px"
              containerWidth="260px"
              imageHeight="260px"
              imageWidth="260px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={false}
            />
          </div>
          
          {/* SVG arrow_down - visible only on sm breakpoint and above */}
          <div className="hidden sm:block mx-4">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 285" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-full min-h-[260px]">
    <line x1="12" y1="20" x2="12" y2="280"></line>
    <polyline points="20 273 12 281 4 273"></polyline>
  </svg>
</div>
          {/* Simple text section on the right */}
          <div className="w-full sm:w-1/2 max-w-xl flex flex-col justify-center p-4">
            <p className="text-white text-3xl font-semibold text-center sm:text-left">
              Join us for an unforgettable journey through tech and tradition. Witness the magic of both worlds at Tiara on March 20 and 21.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}