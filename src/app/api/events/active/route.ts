import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
    try {
        const events = await prisma.event.findMany({
            where: {
                isFinished: false,
            },
            select: {
                id: true,
                name: true,
                category: true,
                costs: true,
                teamEvent: true,
            },
            orderBy: {
                category: "asc",
            },
        });

        // Transform events into the required format
        const categorizedEvents = events.reduce(
            (acc, event) => {
                const category = event.category.toLowerCase().replace(" ", "_");
                if (!acc[category]) {
                    acc[category] = {
                        events: [{}],
                    };
                }

                acc[category].events[0][event.id] = {
                    name: event.name,
                    costs: event.costs,
                    team: event.teamEvent,
                };

                return acc;
            },
            {} as Record<
                string,
                { events: Array<Record<string, { name: string; costs: number; team: boolean }>> }
            >
        );

        return NextResponse.json(categorizedEvents);
    } catch (error) {
        console.error("Error fetching active events:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
