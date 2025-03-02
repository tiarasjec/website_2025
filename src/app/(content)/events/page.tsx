"use client";
import Container from "@/components/shared/container";
import { LinkProps } from "@/components/ui/hover/link";
import { useEffect, useState } from "react";
import EventWidget from "@/components/widgets/EventWidget";

export default function EventsPage() {
  const [categories, setCategories] = useState<LinkProps[]>([]);

  useEffect(() => {
    fetch("/api/events")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <>
        <section className="w-full max-w-5xl">
          <EventWidget />
        </section>
    </>
  );
}
