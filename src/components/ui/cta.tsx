import RotatingText from "./rotating-text"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { FlipWords } from "../ui/flip-words";

import { tiaraFont } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export default function CTA() {
  const words = ["innovations","ideas","creativity","opportunities","success","growth","knowledge","skills","experiences","memories","fun","friendship","collaboration","learning","development"];
 
  return (
    <div className="w-full py-8 sm:py-10 md:py-12 px-4 flex items-center justify-center max-w-7xl mx-auto">
      <div className="w-full">
        <p className={cn("flex flex-wrap items-center text-3xl sm:text-4xl md:text-5xl justify-center text-center sm:text-left",tiaraFont.className)}>
            Join us @ sjec for unlimited 
            <FlipWords words={words} duration={2000}/>
        </p>
      </div>
    </div>
  )
}