import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

interface EventRegistration {
    name: string;
    registrations: number;
}

export async function GET(req: NextRequest, { params }: { params: { event: string } }) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized", isOk: false }, { status: 401 });
    }
    if (session.user.role === "PARTICIPANT") {
        return NextResponse.json({ error: "Unauthorized", isOk: false }, { status: 401 });
    }
    const events: EventRegistration[] = [];
    const allEvents = await prisma.event.findMany({
        select: {
            name: true,
        },
    });
    for (const event of allEvents) {
        const typedEvent = event as { name: string };
        const eventRegistrations = await prisma.user
            .findMany({
                where: {
                    events: {
                        has: typedEvent.name,
                    },
                },
            })
            .then((users) => users.length);
        events.push({ name: typedEvent.name, registrations: eventRegistrations });
    }

    return NextResponse.json(
        events.sort((a, b) => a.name.localeCompare(b.name)),
        { status: 200 }
    );
}
