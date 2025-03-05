import { tiaraFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function PageLoading() {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center ">
            <div
                className={cn(
                    "flex items-center text-4xl md:text-6xl animate-pulse duration-700",
                    tiaraFont.className
                )}
            >
                <span>Ti</span>
                <span className="text-[#eb1c2c]">ar</span>
                <span>a</span>
                <span className="text-[#eb1c2c] ml-2">{"'"}</span>
                <span>25</span>
            </div>
        </div>
    );
}

export function DataLoading() {
    return (
        <div className="w-full h-48 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground mt-4">Fetching data...</p>
        </div>
    );
}
