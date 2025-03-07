"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CardType } from "@/components/ui/hover/scroll";
import Image from "next/image";
import Loading from "@/app/loading";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { tiaraFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Header } from "@/widget/header";
import Footer from "@/widget/footer";
import ShaderVisualization from "@/widget/background";

const formatCategoryForDisplay = (category: string) => {
    return category
        .replace(/[_\s]+/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export default function EventCategoryPage() {
    const [cards, setCards] = useState<CardType[]>([]);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const category = decodeURIComponent(pathname.split("/")[2]);

    useEffect(() => {
        setLoading(true);
        const path = pathname.split("/")[2];
        console.log("Fetching events for path:", path);

        fetch(`/api/events/active/${path}`)
            .then((response) => {
                if (!response.ok) {
                    console.error("API response not OK:", response.status, response.statusText);
                    throw new Error(`Failed to fetch events: ${response.status}`);
                }
                return response.json();
            })
            .then((dataList) => {
                console.log("Received data:", dataList);
                setCards(dataList);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
                setLoading(false);
            });
    }, [pathname]);

    return (
        <>
            <Header />
            <ShaderVisualization />
            <div className="h-fit">
                <div className="-ml-5 flex justify-center items-center pt-32 z-50">
                    <div
                        className={cn(
                            "text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl w-fit text-center duration-500",
                            tiaraFont.className
                        )}
                    >
                        {formatCategoryForDisplay(category)} Events
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center min-h-[300px]">
                        <Loading />
                    </div>
                ) : (
                    <div className="w-full flex justify-center">
                        <div className="p-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                            {cards
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((card, index) => {
                                    if (card.id === "50") {
                                        return null;
                                    }
                                    return (
                                        <Link
                                            href={`/events/${pathname.split("/")[2]}/${card.id}`}
                                            key={index}
                                        >
                                            <CardContainer containerClassName="relative flex items-center justify-center transition-all duration-200 ease-linear">
                                                <CardBody className="relative">
                                                    <CardItem translateZ="100" className="w-full mt-4">
                                                        <Image
                                                            src={card.thumbnail}
                                                            className="shadow-2xl rounded-2xl "
                                                            alt={`${card.name} thumbnail`}
                                                            width={1200}
                                                            height={800}
                                                            priority
                                                            sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 33vw"
                                                        />
                                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                                            <h3 className="text-white text-xl">
                                                                {card.name}
                                                            </h3>
                                                        </div>
                                                    </CardItem>
                                                </CardBody>
                                            </CardContainer>
                                        </Link>
                                    );
                                })}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
