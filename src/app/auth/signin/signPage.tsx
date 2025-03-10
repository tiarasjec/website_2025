"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { signIn, useSession } from "next-auth/react";

import { useState, useEffect } from "react";

import { tailChase } from "ldrs";

export default function SignIn() {
    const router = useRouter();
    const { status } = useSession();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    useEffect(() => {
        if (typeof window !== "undefined") {
            tailChase.register();
        }
        const userAgent = window.navigator.userAgent;
        const url = window.location.href;

        // Check for LinkedIn and Instagram app on iPhone/iPad and redirect
        if (
            userAgent.includes("Mobile") &&
            (userAgent.includes("iPhone") || userAgent.includes("iPad")) &&
            (userAgent.includes("LinkedInApp") || userAgent.includes("Instagram"))
        ) {
            window.location.href = "x-safari-" + url;
            return;
        }

        console.log("user-Agent " + userAgent);
        console.log("url = " + url);

        if (status === "unauthenticated") {
            setLoading(true);
            signIn("google").catch((error) => {
                console.error("Sign in failed:", error);
                setLoading(false);
            });
        } else if (status === "authenticated") {
            router.push(callbackUrl);
        }
    }, [status, router, callbackUrl]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {loading ? (
                <div className="flex flex-col items-center">
                    <l-tail-chase size={"88"} speed={"1.75"} color={"#FF0000"}></l-tail-chase>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <l-tail-chase size={"88"} speed={"1.75"} color={"#FF0000"}></l-tail-chase>
                    <p className="text-red-500 text-center mt-4">Please wait, redirecting...</p>
                </div>
            )}
        </div>
    );
}
