"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Signin() {
    const router = useRouter();
    const { status } = useSession();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    useEffect(() => {
        if (status === "unauthenticated") {
            signIn("google");
        } else if (status === "authenticated") {
            router.push(callbackUrl || "/");
        }
    }, [status, router, callbackUrl]);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-muted">
            <Card className="w-full max-w-md mx-4 shadow-lg">
                <CardContent className="p-8">
                    <div className="flex flex-col items-center space-y-6">
                        <div className="rounded-full bg-muted p-4">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-semibold tracking-tight">
                                Signing in to Tiara 2025
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Please wait while we redirect you to Google Sign-in...
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
