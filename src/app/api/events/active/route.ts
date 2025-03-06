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
                thumbnail: true,
                description: true,
                costs: true,
                teamEvent: true,
                category: true, 
            },
        });

        console.log(`Found ${events.length} active events`);
        
        const eventsByCategory: Record<string, any[]> = {};
        
        events.forEach(event => {
            const category = event.category;
            if (!eventsByCategory[category]) {
                eventsByCategory[category] = [];
            }
            eventsByCategory[category].push({
                id: event.id,
                name: event.name,
                thumbnail: event.thumbnail || "/images/default-event.jpg",
                description: event.description || "",
                costs: event.costs,
                teamEvent: event.teamEvent || false,
            });
        });

        return NextResponse.json(eventsByCategory);
    } catch (error) {
        console.error("Error fetching active events:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}