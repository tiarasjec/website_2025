"use client";
import { RegisterHeader } from "@/components/ui/register-header";
import { useSession } from "next-auth/react";
import { RegisterFooter } from "@/components/ui/register-footer";
import { RestrictedAccess } from "@/components/ui/restricted-access";
import { UserRole } from "@prisma/client";

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession({
        required: true,
    });

    if (session?.user.role !== UserRole.ADMIN && session?.user.role !== UserRole.SUPER_ADMIN) {
        return <RestrictedAccess message="Registeration page open soon" />;
    }
    return (
        <>
            <RegisterHeader />
            <main className="min-h-screen pt-20 ">{children}</main>
            <RegisterFooter />
        </>
    );
}
