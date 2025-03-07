"use client";
import Container from "@/components/shared/container";
import { LinkProps } from "@/components/ui/hover/link";
import { useEffect, useState } from "react";
import { Header } from "@/widget/header"
import Footer from "@/widget/footer";
import ShaderVisualization from "@/widget/background";
import Events from "@/widget/events";
// import { cn } from "@/lib/utils";
// import { tiaraFont } from "@/lib/fonts";

export default function EventsPage() {
  const [categories, setCategories] = useState<LinkProps[]>([]);

  // useEffect(() => {
  //   fetch("/api/events")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCategories(data);
  //     })
  //     .catch((error) => console.error("Error fetching events:", error));
  // }, []);

  return (
    <>
    <Header/>
    <ShaderVisualization />
        <Events/>
          <Footer />
    </>
  );
}
