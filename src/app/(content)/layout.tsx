"use client";

import Footer from "@/widget/footer";
import { Header } from "@/widget/header";
import React from "react";
import Background from "@/widget/background";

function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Background />
      <div>
        <Header />
        {children}
      </div>
      <Footer />
    </>
  );
}

export default ContentLayout;