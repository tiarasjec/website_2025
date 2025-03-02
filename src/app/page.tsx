"use client";
import Background from "../components/ui/bg"
import Footer from "../components/ui/footer"
import CTA from "@/components/ui/cta";
export default function Home() {
  return (
    <>
  <Background/>
   <div className=" w-screen h-screen flex flex-col items-center justify-center">
    <CTA/>
   </div>
  <Footer/>

  </>
  );
}
