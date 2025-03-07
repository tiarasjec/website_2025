import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_request: Request, { params }: { params: { category: string } }) {
    try {
        const { category } = params;

        const formattedCategory = category
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");

        const events = await prisma.event.findMany({
            where: {
                category: {
                    equals: formattedCategory,
                    mode: "insensitive",
                },
            },
            select: {
                id: true,
                name: true,
                thumbnail: true,
                description: true,
                costs: true,
                teamEvent: true,
            },
        });

       
        if (events.length > 0) {
            console.log("First event:", events[0]);
        }

        const cardData = events.map((event) => ({
            id: event.id,
            name: event.name,
            thumbnail: event.thumbnail || "/images/default-event.jpg",
            description: event.description || "",
            costs: event.costs,
            teamEvent: event.teamEvent || false,
        }));

        return NextResponse.json(cardData);
    } catch (error) {
        console.error(`Error fetching events for category ${params.category}:`, error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
