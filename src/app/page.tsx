"use client";
import Image from "next/image";
import Hero from "@/widget/hero";
import Marque from "@/widget/marque";
import { ReactLenis, useLenis } from "lenis/react";
import CTA from "@/components/ui/cta";
import CTA2 from "@/components/ui/cta-2";
import { Head } from "react-day-picker";
import Events from "@/widget/events";
import { Header } from "@/widget/header";
import Footer from "@/widget/footer";
import ShaderVisualization from "@/widget/background";
import Video from "@/components/ui/videobox";
import { useEffect, useState } from "react";
import React from "react";
import EventCTA from "@/widget/final_CTA";
import { LoadingScreen } from "@/components/ui/loading-screen";

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const lenis = useLenis(({ scroll }) => {
        // called every scroll
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        // Set a timeout to match the loading screen duration
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2200); // 2.2s to account for the loading animation and delay
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <>
            <Header />
            <ShaderVisualization />
            <ReactLenis root>
                <Hero />
                <CTA2 />
                <div>
                    <Marque />
                    <Events />
                    <Video />
                    <EventCTA />
                </div>
            </ReactLenis>
            <Footer />
        </>
    );
}
