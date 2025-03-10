"use client";
import { RegisterHeader } from "@/components/ui/register-header";
import { RegisterFooter } from "@/components/ui/register-footer";

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <RegisterHeader />
            <main>{children}</main>
            <RegisterFooter />
        </>
    );
}
