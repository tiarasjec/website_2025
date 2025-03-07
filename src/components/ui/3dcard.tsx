"use client";
import Image from "next/image";
import { forwardRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { tiaraFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface InteractiveHoverButtonProps {
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
}

interface InteractiveHoverButtonProps {
    className?: string;
    href?: string; // New prop for navigation
    children?: React.ReactNode;
}

const InteractiveHoverButton: React.FC<InteractiveHoverButtonProps> = ({ className, href, children }) => {
    const router = useRouter();

    const handleClick = () => {
        if (href) {
            window.location.href = href; // Reload the page and navigate
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`group relative inline-flex h-20 w-32 sm:w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r dark:from-[#c95050] dark:to-[#eb1c2c] from-[#ff7b7b] to-[#ff1e1e] font-medium text-white border-2 border-[#e25656] transition-all duration-300 sm:hover:w-32 shadow-xl ${className}`}
        >
            <div className="inline-flex whitespace-nowrap opacity-100 sm:opacity-0 transition-all duration-200 sm:group-hover:-translate-x-3 sm:group-hover:opacity-100">
                {children}
            </div>
            <div className="absolute right-3.5">
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                >
                    <path
                        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </div>
        </button>
    );
};

interface CardProps {
    id: string;
    frontSrc: string;
    frontAlt: string;
    backText: string;
    title?: string;
    buttonText?: string;
    buttonUrl?: string;
    backSrc?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ id, frontSrc, frontAlt, backText, title, buttonText, buttonUrl, backSrc }, ref) => {
        return (
            <>
                <Link href={buttonUrl || ""}>
                    <div className="card" id={id} ref={ref}>
                        <div className="card-wrapper">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <Image
                                        priority
                                        src={frontSrc || "/placeholder.svg"}
                                        width={500}
                                        height={500}
                                        alt={frontAlt}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flip-card-back flex flex-col justify-between p-6 space-y-4">
                                    {title && (
                                        <h3
                                            className={cn(
                                                "text-2xl text-center font-bold text-[#eb1c2c] tracking-wider",
                                                tiaraFont.className
                                            )}
                                        >
                                            {title}
                                        </h3>
                                    )}
                                    <Image
                                        src={backSrc || "/placeholder.svg"}
                                        width={300}
                                        height={200}
                                        alt={frontAlt}
                                        className="w-full h-38 object-cover rounded-md"
                                    />
                                    {backText && (
                                        <p className="text-[#eb1c2c] text-center text-xl">{backText}</p>
                                    )}
                                    {buttonText && buttonUrl && (
                                        <InteractiveHoverButton className="self-center" href={buttonUrl}>
                                            {buttonText}
                                        </InteractiveHoverButton>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </>
        );
    }
);

Card.displayName = "Card";
export default Card;
