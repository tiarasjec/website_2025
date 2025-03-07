"use client"
import Image from "next/image";
import Hero from "@/widget/hero";
import Marque from "@/widget/marque";
import { ReactLenis, useLenis } from 'lenis/react'
import CTA from "@/components/ui/cta";
import CTA2 from "@/components/ui/cta-2";
import { Head } from "react-day-picker";
import Events from "@/widget/events";
import { Header } from "@/widget/header"
import Footer from "@/widget/footer";
import ShaderVisualization from "@/widget/background";
import Video from "@/components/ui/videobox";
import CTA3 from "@/components/ui/cta-3"
export default function Home() {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  })
  return (
<>
    <Header/>
    <ShaderVisualization />
<ReactLenis root>
<Hero/>
<CTA2/>
<div >
<Marque/>
<Events/>
<Video/>
<CTA3/>
<div className="h-screen"></div>
</div>
</ReactLenis>
  <Footer />
</>
  );
}
