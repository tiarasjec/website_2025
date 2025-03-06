"use client";

import Link from "next/link";
import { CircleUser, Menu, Users, CreditCard, Coins, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { UserRole } from "@prisma/client";
import { ThemeProvider } from "next-themes";
import { PageLoading } from "@/components/ui/page-loading";
import { RestrictedAccess } from "@/components/ui/restricted-access";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession({
        required: true,
    });

    if (status === "loading") {
        return <PageLoading />;
    }

    if (!session) {
        return <RestrictedAccess message="Please sign in to access the admin dashboard" />;
    }

    if (session.user.role !== UserRole.ADMIN && session.user.role !== UserRole.SUPER_ADMIN) {
        return <RestrictedAccess message="You don't have permission to access the admin dashboard" />;
    }

    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-background">
                <div className="hidden border-r bg-card md:block">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link href="/" className="flex items-center gap-2 font-semibold">
                                <span className="">Tiara 2025</span>
                            </Link>
                        </div>
                        <div className="flex-1">
                            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                <Link
                                    href="/admin"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-accent"
                                >
                                    <Users className="h-4 w-4" />
                                    Users
                                </Link>
                                <Link
                                    href="/admin/payments"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-accent"
                                >
                                    <CreditCard className="h-4 w-4" />
                                    Payments
                                </Link>
                                <Link
                                    href="/admin/razorpay"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-accent"
                                >
                                    <Coins className="h-4 w-4" />
                                    Razorpay
                                </Link>
                                <Link
                                    href="/admin/events"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-accent"
                                >
                                    <Calendar className="h-4 w-4" />
                                    Events
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col">
                                <nav className="grid gap-2 text-lg font-medium">
                                    <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                                        <span className="sr-only">Tiara 2025</span>
                                    </Link>
                                    <Link
                                        href="/admin"
                                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                    >
                                        <Users className="h-5 w-5" />
                                        Users
                                    </Link>
                                    <Link
                                        href="/admin/payments"
                                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:text-foreground"
                                    >
                                        <CreditCard className="h-5 w-5" />
                                        Payments
                                    </Link>
                                    <Link
                                        href="/admin/razorpay"
                                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                    >
                                        <Coins className="h-4 w-4" />
                                        Razorpay
                                    </Link>
                                    <Link
                                        href="/admin/events"
                                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                    >
                                        <Calendar className="h-4 w-4" />
                                        Events
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                        <div className="w-full flex-1" />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="icon" className="rounded-full">
                                    {session && session.user ? (
                                        <Image
                                            src={session.user.image!}
                                            alt={session.user.name!}
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                    ) : (
                                        <CircleUser className="h-5 w-5" />
                                    )}
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <Link href="/">Homepage</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={async () =>
                                        await signOut({
                                            callbackUrl: "/",
                                        })
                                    }
                                >
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
                        {children}
                    </main>
                </div>
            </div>
        </ThemeProvider>
    );
}
