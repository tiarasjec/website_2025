import React, { useState } from "react";
import RotatingText from "./rotating-text";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { tiaraFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";


export default function CTA() {

  return (

 
          <div className="relative w-full h-64">
  
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <RotatingText
          texts={['Innovation','Technology','Challenges','Creativity','Learning',]}
          mainClassName={cn("px-2 sm:px-2 md:px-3 bg-red-500 text-white text-2xl overflow- py-0.5 sm:py-1 md:py-2 justify-center rounded-lg ", tiaraFont.className)}
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={3000}
        />
      </div>
      </div>
  );
}