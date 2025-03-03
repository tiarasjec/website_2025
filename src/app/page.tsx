"use client"
import Image from "next/image";
import Hero from "@/widget/hero";
import Marque from "@/widget/marque";
import { ReactLenis, useLenis } from 'lenis/react'
import Header from "@/widget/header";
import Footer from "@/widget/footer";
import CTA from "@/components/ui/cta";
import CTA2 from "@/components/ui/cta-2";
import { Head } from "react-day-picker";

export default function Home() {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  })
  return (
<>
<ReactLenis root>
<Hero/>
<div >
<Marque/>

</div>
<div className="h-screen"></div>
</ReactLenis>
</>
  );
}
