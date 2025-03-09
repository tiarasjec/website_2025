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
    const lenis = useLenis(({ scroll }) => {
        // called every scroll
    });
      useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


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
