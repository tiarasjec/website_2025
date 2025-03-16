import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PaymentStatus, UserRole } from "@prisma/client";
import { getServerSideSession } from "@/lib/getServerSideSession";
import { sendRegistrationEmail } from "@/lib/registrationEmail";
import { generatedSignature } from "@/lib/utils";
import { razorpay } from "@/lib/razorpay";

export async function POST(request: NextRequest, context: { params: { paymentId: string } }) {
    const session = await getServerSideSession();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized", isOk: false }, { status: 401 });
    }
    if (session?.user.role !== UserRole.SUPER_ADMIN) {
        return NextResponse.json({ message: "Unauthorized", isOk: false }, { status: 401 });
    }

    const { paymentId } = context.params;
    const payment = await razorpay.payments.fetch(paymentId);
    const signature = generatedSignature(payment.order_id, paymentId);

    const user = await prisma.user.findUnique({
        where: { email: payment.notes.customerEmail },
    });

    const prismaPayment = await prisma.payment.findUnique({
        where: { razorpayPaymentId: payment.id },
    });

    try {
        await sendRegistrationEmail({
            amount: parseFloat(payment.amount.toString()),
            email: payment.email,
            teamName: [],
            contactNumber: payment.contact.toString(),
            name: user?.name!,
            events: payment.notes.events.split(",").map((event) => event.trim()),
            registrationLink: `https://tiarasjec.in/api/verify/${user?.id}`,
        });
    } catch (error) {
        console.log(error);
    }
    if (!prismaPayment) {
        await prisma.$transaction(async (prisma) => {
            await prisma.payment.create({
                data: {
                    amount: parseFloat(payment.amount.toString()),
                    signature,
                    razorpayPaymentId: payment.id,
                    orderCreationId: payment.order_id,
                    status: PaymentStatus.SUCCESS,
                    user: {
                        connect: {
                            email: user?.email!,
                        },
                    },
                },
            });
            const existingUser = await prisma.user.findUnique({
                where: { email: user?.email! },
                include: { teams: true },
            });

            const mergedEvents = [
                ...existingUser?.events!,
                ...payment.notes.events.split(",").map((event) => event.trim()),
            ];
            await prisma.user.update({
                where: { email: user?.email! },
                data: {
                    registrationEmailSent: true,
                    contact: payment.contact.toString(),
                    college: payment.notes.college,
                    events: mergedEvents,
                    teams: { createMany: { data: [] } },
                },
                include: { teams: true },
            });
        });
    }
    return NextResponse.json(
        {
            message: "Payment verified Successfully",
            isOk: true,
        },
        {
            status: 200,
        }
    );
}
