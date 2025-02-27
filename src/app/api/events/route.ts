import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const events = await prisma.event.findMany({
            select: {
                id: true,
                name: true,
                category: true,
                isFinished: true,
                costs: true,
                facultyCoordinators: true,
                studentCoordinators: true,
            },
        });
        return NextResponse.json({ events });
    } catch (error) {
        console.error("Error fetching events:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
