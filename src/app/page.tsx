"use client"
import Image from "next/image";
import Hero from "@/widget/hero";
import ShaderVisualization from "@/widget/background";
import Marque from "@/widget/marque";
import { ReactLenis, useLenis } from 'lenis/react'
import Nav from "@/widget/header";
import Footer from "@/widget/footer";
export default function Home() {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  })
  return (
<>
<ReactLenis root>
  {/* <Nav/> */}
<ShaderVisualization/>
{/* <Hero/> */}
<div >
<Marque/>
</div>
<div className="h-screen"></div>
<Footer/>
</ReactLenis>
</>
  );
}
