"use client"

import { cn } from "@/lib/utils"
import { tiaraFont } from "@/lib/fonts"
import Image from "next/image"

export default function CTA2() {
  const text = "Get  ready  for  an  electrifying  experience";
  const words = text.split(" ");

  return (
    <div className="w-full py-8 sm:py-10 md:py-12 px-4 flex items-center justify-center max-w-7xl mx-auto">
      <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
        <div className="relative flex flex-col items-start">
          <h2 className={cn("text-white text-7xl", tiaraFont.className)}>
            {words.map((word, index) => (
              <span 
                key={index} 
                className="inline-block mr-2 transition-transform duration-300 ease-out hover:scale-110 origin-bottom"
              >
                {word}
              </span>
            ))}
          </h2>
          <Image 
            src="/assets/dancing-removebg-preview.png" 
            alt="CTA Image" 
            width={300} 
            height={300} 
            className="mt-4 "
          />
        </div>
      </div>
    </div>
  )
}
