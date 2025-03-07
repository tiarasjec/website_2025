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
        const startTime = Date.now();
        const duration = 2000; // 2 seconds duration
        let loadedImages = 0;
        const totalImages = imagesToPreload.length;

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

        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const timeProgress = Math.min(elapsed / duration, 1);
            const imageProgress = totalImages > 0 ? loadedImages / totalImages : 1;

            // Combine time and image loading progress
            const combinedProgress = Math.min(
                Math.floor((timeProgress * 0.5 + imageProgress * 0.5) * 100),
                100
            );

            if (combinedProgress < 100) {
                setProgress(combinedProgress);
                requestAnimationFrame(updateProgress);
            } else {
                setProgress(100);
                setTimeout(() => {
                    onLoadingComplete?.();
                }, 200);
            }
        };

        preloadImages();
        requestAnimationFrame(updateProgress);
    }, [onLoadingComplete, imagesToPreload]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
            <div className="w-16 h-16 border-4 border-t-[#eb1c2c] border-b-[#eb1c2c] rounded-full animate-spin"></div>
            <p className={cn("mt-4 text-white/80 text-xl", tiaraFont.className)}>Loading {progress}%</p>
        </div>
    );
}
