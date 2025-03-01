import { ShieldAlert } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";

interface RestrictedAccessProps {
    message?: string;
    showHome?: boolean;
}

export function RestrictedAccess({
    message = "You don't have permission to access this page",
    showHome = true,
}: RestrictedAccessProps) {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-background">
            <div className="flex flex-col items-center max-w-md text-center px-4">
                <ShieldAlert className="h-12 w-12 text-destructive mb-4" />
                <h2 className="text-2xl font-bold mb-2">Access Restricted</h2>
                <p className="text-muted-foreground mb-6">{message}</p>
                {showHome && (
                    <Link href="/">
                        <Button variant="outline">Return to Home</Button>
                    </Link>
                )}
            </div>
        </div>
    );
}
