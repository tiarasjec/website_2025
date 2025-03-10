import { getServerSideSession } from "@/lib/getServerSideSession";
import { NextRequest, NextResponse } from "next/server";
import shortid from "shortid";
import { razorpay } from "@/lib/razorpay";
import { UserRole } from "@prisma/client";

export async function GET(request: NextRequest) {
    const session = await getServerSideSession();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized", isOk: false }, { status: 401 });
    }

    if (session?.user.role !== UserRole.ADMIN && session?.user.role !== UserRole.SUPER_ADMIN) {
        return NextResponse.json({ message: "Unauthorized", isOk: false }, { status: 401 });
    }

    try {
        const paymentDatas = await razorpay.payments.all({
            count: 100,
        });

        const paymentData = {
            entity: paymentDatas.entity,
            count: paymentDatas.count,
            items: paymentDatas.items.filter((paymentItem) => paymentItem.status === "captured"),
        };

        return NextResponse.json({ paymentData, isOk: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error", isOk: false }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const session = await getServerSideSession();

    if (!session) {
        return NextResponse.json({ message: "Unauthorized", isOk: false }, { status: 401 });
    }

    const body = await request.json();
    const payment_capture = 1;
    const amount = body.amount * 100;
    const currency = "INR";
    const options = {
        amount: amount.toString(),
        currency,
        payment_capture,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json({ orderId: order.id }, { status: 200 });
}
