import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";
import { auth } from "@/auth";
import { sendRegistrationEmail } from "@/lib/registrationEmail";
import { razorpay } from "@/lib/razorpay";
import { generatedSignature } from "@/lib/utils";

interface PaymentResponse {
    amount: number;
    orderCreationId: string;
    razorpayPaymentId: string;
    razorpayOrderId: string;
    razorpaySignature: string;
    college: string;
    events: string[];
    teams: {
        name: string;
        event: string;
    }[];
    phone: string;
}

export async function POST(request: NextRequest) {
    const data: PaymentResponse = await request.json();
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized", isOk: false }, { status: 401 });
    }

    const signature = generatedSignature(data.orderCreationId, data.razorpayPaymentId);

    const amount = parseFloat((await razorpay.payments.fetch(data.razorpayPaymentId)).amount.toString());

    if (signature === data.razorpaySignature) {
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email!,
            },
        });

        try {
            await sendRegistrationEmail({
                amount,
                email: session.user.email!,
                teamName: data.teams.map((team) => team.name),
                contactNumber: data.phone,
                name: session.user.name!,
                events: data.events,
                registrationLink: `https://tiarasjec.in/api/verify/${user?.id}`,
            });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: "Internal Server Error", isOk: false }, { status: 500 });
        }

        await prisma.$transaction(async (prisma) => {
            await prisma.payment.create({
                data: {
                    amount,
                    signature: data.razorpaySignature,
                    razorpayPaymentId: data.razorpayPaymentId,
                    orderCreationId: data.orderCreationId,
                    status: PaymentStatus.SUCCESS,
                    user: {
                        connect: {
                            email: session?.user?.email!,
                        },
                    },
                },
            });

            const existingUser = await prisma.user.findUnique({
                where: {
                    email: session.user.email!,
                },
                include: {
                    teams: true,
                },
            });

            const mergedEvents = [...existingUser?.events!, ...data.events];
            await prisma.user.update({
                where: {
                    email: session.user.email!,
                },
                data: {
                    registrationEmailSent: true,
                    contact: data.phone,
                    college: data.college,
                    events: mergedEvents,
                    teams: {
                        createMany: {
                            data: data.teams,
                        },
                    },
                },
                include: {
                    teams: true,
                },
            });
        });
        return NextResponse.json({ message: "Payment verified Successfully", isOk: true }, { status: 200 });
    }
}
