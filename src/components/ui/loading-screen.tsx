import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { tiaraFont } from "@/lib/fonts";

export function LoadingScreen() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const startTime = Date.now();
        const duration = 2000; // 2 seconds duration

        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);

            if (newProgress < 100) {
                setProgress(newProgress);
                requestAnimationFrame(updateProgress);
            } else {
                setProgress(100);
            }
        };

        requestAnimationFrame(updateProgress);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black">
            <div className="w-16 h-16 border-4 border-t-[#eb1c2c] border-b-[#eb1c2c] rounded-full animate-spin"></div>
            <p className={cn("mt-4 text-white/80 text-xl", tiaraFont.className)}>Loading {progress}%</p>
        </div>
    );
}
