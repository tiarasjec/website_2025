import type { Metadata } from "next";
import { Goldman } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DataTableStoreProvider } from "@/stores/dataTableStoreProvider";
import Script from "next/script";
import { TailwindIndicator } from "@/components/shared/tailwind";
import { ThemeProvider } from "next-themes";
import { ReactLenis, useLenis } from "lenis/react";
const goldman = Goldman({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
    title: "Tiara 2025",
    description:
        "Tiara is a National-level Techno-Cultural fest, conducted for young minds aspiring to be extraordinary, that is open to all students of undergraduate level and above to come and showcase their talents and represent their respective institutions on the grand stage of Tiara.",
    icons: {
        icon: "/assets/favicon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <Script
                defer
                src={process.env.NEXT_PUBLIC_WEBSITE_SRC}
                data-website-id={process.env.NEXT_PUBLIC_WEBSITE_ID}
            ></Script>
            <body className={`${goldman.className} overflow-x-hidden bg-background text-foreground`}>
                <ReactLenis root>
                    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
                        <SessionProvider>
                            <TooltipProvider>
                                <DataTableStoreProvider isSelecting={false}>
                                    {children}
                                    <Toaster />
                                </DataTableStoreProvider>
                            </TooltipProvider>
                            <TailwindIndicator />
                        </SessionProvider>
                    </ThemeProvider>
                </ReactLenis>
            </body>
            <Script src="https://checkout.razorpay.com/v2/checkout.js" />
        </html>
    );
}
