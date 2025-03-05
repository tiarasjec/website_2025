import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_request: Request, { params }: { params: { category: string, id: string } }) {
    try {
        const { category, id } = params;
        console.log("Fetching event details for:", { category, id }); 

        const formattedCategory = category
            .split("_")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
            
        console.log("Searching for category and id:", { formattedCategory, id });

        const event = await prisma.event.findFirst({
            where: {
                id: id,
                category: {
                    equals: formattedCategory,
                    mode: "insensitive",
                },
            },
            select: {
                id: true,
                name: true,
                description: true,
                category: true,
                rules: true,
                prerequisites: true,
                general_rules: true,
                thumbnail: true,
                startTime: true,
                endTime: true,
                isFinished: true,
                costs: true,
                facultyCoordinators: true,
                studentCoordinators: true,
            },
        });

        console.log("Found event:", event ? "yes" : "no");
        if (event) {
            console.log("Event details:", {
                id: event.id,
                name: event.name,
                category: event.category,
                isFinished: event.isFinished,
                startTime: event.startTime,
                endTime: event.endTime,
                costs: event.costs,
                rules: event.rules,
                prerequisites: event.prerequisites,
                general_rules: event.general_rules,
                facultyCoordinators: event.facultyCoordinators,
                studentCoordinators: event.studentCoordinators,
                thumbnail: event.thumbnail
            });
        }

        const cardData = event ? {
            ...event,
            thumbnail: event.thumbnail || "/images/default-event.jpg",
            rules: event.rules || [],
            prerequisites: event.prerequisites || [],
            general_rules: event.general_rules || [],
            facultyCoordinators: event.facultyCoordinators || [],
            studentCoordinators: event.studentCoordinators || [],
        } : null;

        if (!cardData) {
            console.log("No event found with id:", id);
            return new NextResponse("Event not found", { status: 404 });
        }

        return NextResponse.json({ event: cardData });
    } catch (error) {
        console.error(`Error fetching event details for category ${params.category}, id ${params.id}:`, error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}