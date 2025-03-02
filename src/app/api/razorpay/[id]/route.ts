import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

export async function GET(request: Request, context: { params: { id: string } }) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized", isOk: false }, { status: 401 });
    }
    if (session.user.role !== UserRole.ADMIN && session.user.role !== UserRole.SUPER_ADMIN) {
        return NextResponse.json({ message: "Unauthorized", isOk: false }, { status: 401 });
    }
    const { id } = context.params;
    try {
        const payemntData = await razorpay.payments.fetch(id);
        return NextResponse.json(payemntData, { status: 200 });
    } catch (error) {
        console.log("Error fetching the payment data", error);
        return NextResponse.json({ error: "Payment not found", isOk: false }, { status: 500 });
    }
}
