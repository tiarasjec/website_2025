import RotatingText from "./rotating-text"
import "@fortawesome/fontawesome-free/css/all.min.css"

import { tiaraFont } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export default function CTA() {
  return (
    <div className="w-full py-8 sm:py-10 md:py-12 px-4 flex items-center justify-center max-w-7xl mx-auto">
      <div className="w-full">
        <p className="flex flex-wrap items-center justify-center text-center sm:text-left">
          <span className={cn("text-xl sm:text-2xl md:text-3xl mr-2 mb-2 sm:mb-0", tiaraFont.className)}>
            Join us @ sjec for unlimited&nbsp;
          </span>
          <RotatingText
            texts={["innovation", "technology", "challenges", "learning", "inventions"]}
            mainClassName={cn(
              "bg-red-700 text-white text-xl sm:text-2xl md:text-3xl overflow-hidden rounded-lg inline-block",
              tiaraFont.className,
            )}
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-visible py-1 px-3 sm:px-4 md:px-5"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={3000}
          />
        </p>
      </div>
    </div>
  )
}