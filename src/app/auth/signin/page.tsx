import { Suspense } from "react";
import Signin from "./signPage";

export default function AuthPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Signin />
        </Suspense>
    );
}
