import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { tiaraFont } from "@/lib/fonts";

interface LoadingScreenProps {
    onLoadingComplete?: () => void;
    imagesToPreload?: string[];
}

export function LoadingScreen({ onLoadingComplete, imagesToPreload = [] }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let loadedImages = 0;
        const totalImages = imagesToPreload.length;
        let timeoutId: NodeJS.Timeout;

        // Preload images
        const preloadImages = () => {
            if (totalImages === 0) return;

            imagesToPreload.forEach((src) => {
                const img = new Image();
                img.src = src;
                img.onload = img.onerror = () => {
                    loadedImages++;
                };
            });
        };

        // Simple increment function
        const incrementProgress = () => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    if (totalImages === 0 || loadedImages === totalImages) {
                        setTimeout(() => {
                            onLoadingComplete?.();
                        }, 200);
                        return 100;
                    }
                    return 100;
                }

                // Slow down near the end
                const increment = prevProgress > 80 ? 1 : 2;
                const nextProgress = Math.min(prevProgress + increment, 100);

                timeoutId = setTimeout(incrementProgress, 50);
                return nextProgress;
            });
        };

        preloadImages();
        timeoutId = setTimeout(incrementProgress, 50);

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [onLoadingComplete, imagesToPreload]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
            <div className="w-16 h-16 border-4 border-t-[#eb1c2c] border-b-[#eb1c2c] rounded-full animate-spin"></div>
            <p className={cn("mt-4 text-white/80 text-xl", tiaraFont.className)}>Loading {progress}%</p>
        </div>
    );
}
