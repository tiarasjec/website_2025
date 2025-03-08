import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Get registration count for an event
export async function GET(request: NextRequest) {
    const eventName = request.nextUrl.searchParams.get("eventName");

    if (!eventName) {
        return NextResponse.json({ error: "Event name is required" }, { status: 400 });
    }

    try {
        const registrationCount = await prisma.eventRegistrationCount.findUnique({
            where: { eventName },
        });

        return NextResponse.json({
            currentCount: registrationCount?.currentCount ?? 0,
            maxLimit: registrationCount?.maxLimit ?? null,
            isLimitReached: registrationCount?.maxLimit
                ? registrationCount.currentCount >= registrationCount.maxLimit
                : false,
        });
    } catch (error) {
        console.error("Error fetching registration count:", error);
        return NextResponse.json({ error: "Failed to fetch registration count" }, { status: 500 });
    }
}

// Increment registration count
export async function POST(request: NextRequest) {
    const { eventName } = await request.json();

    if (!eventName) {
        return NextResponse.json({ error: "Event name is required" }, { status: 400 });
    }

    try {
        // Attempt to increment the count directly
        const updated = await prisma.eventRegistrationCount.upsert({
            where: { eventName },
            update: {
                currentCount: { increment: 1 },
                updated_at: new Date(),
            },
            create: {
                eventName,
                currentCount: 1,
                maxLimit: eventName === "SPIN THE DISC" ? 10 : null,
            },
        });

        if (updated.maxLimit && updated.currentCount > updated.maxLimit) {
            // Roll back increment if limit exceeded
            await prisma.eventRegistrationCount.update({
                where: { eventName },
                data: { currentCount: { decrement: 1 } },
            });
            return NextResponse.json(
                {
                    error: "Registration limit reached",
                    isLimitReached: true,
                },
                { status: 400 }
            );
        }

        return NextResponse.json({
            currentCount: updated.currentCount,
            maxLimit: updated.maxLimit,
            isLimitReached: updated.maxLimit ? updated.currentCount >= updated.maxLimit : false,
        });
    } catch (error) {
        console.error("Error updating registration count:", error);
        return NextResponse.json({ error: "Failed to update registration count" }, { status: 500 });
    }
}
