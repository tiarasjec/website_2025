import React from "react";
import RotatingText from "./rotating-text";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { tiaraFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default function CTA() {
  return (
    <div className="w-full py-12 px-4 flex flex-col lg:flex-row items-center justify-center gap-8 max-w-7xl mx-auto">
      {/* Left section with title and rotating text */}
      <div className="flex flex-col mb-6 lg:mb-0 w-full lg:w-1/3">
        <h1 className={cn("text-2xl sm:text-3xl md:text-4xl text-white mb-2", tiaraFont.className)}>
          Join us @ sjec for Unlimited
        </h1>
        <RotatingText   
          texts={['innovation', 'technology', 'challenges', 'creativity', 'learning']}
          mainClassName={cn("px-2 sm:px-3 md:px-4 bg-red-700 text-white text-2xl sm:text-3xl md:text-4xl overflow-hidden py-2 rounded-lg w-fit", tiaraFont.className)}
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={3000}
        />
      </div>
      
      {/* Divider - hidden on mobile, visible on larger screens */}
      <div className="hidden lg:block">
        <div className="h-20 w-px bg-white"></div>
      </div>
      
      {/* Right section with description text */}
      <div className="w-full lg:w-1/2">
        <h4 className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed diam iaculis, blandit odio vel, volutpat urna. Quisque venenatis pretium dolor eu fermentum. Morbi dignissim luctus porttitor.
        </h4>
      </div>
    </div>
  );
}