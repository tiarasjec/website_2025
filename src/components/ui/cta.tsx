import { useEffect, useState } from "react";
import { tiaraFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { FlipWords } from "./flip-words";

export default function CTA() {
  const words = ["innovations","creativity", "opportunities", "knowledge","experiences", "collaboration", "learning", "development"];
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-full py-8 sm:py-10 md:py-12 px-4 flex items-center justify-center max-w-7xl mx-auto">
      <div className="w-full">
        <p className={cn("flex flex-wrap items-center text-3xl sm:text-4xl md:text-5xl justify-center text-center sm:text-left", tiaraFont.className)}>
          Dive into exciting {" "}
          {isClient && <FlipWords words={words} duration={4000} />}
        </p>

      </div>
    </div>
  );
}
