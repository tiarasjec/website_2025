import { getServerSideSession } from "@/lib/getServerSideSession";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(req: Request) {
    try {
        const session = await getServerSideSession();
        if (!session || session.user.role !== "SUPER_ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const data = await req.json();
        const event = await prisma.event.create({
            data: {
                name: data.name,
                description: data.description,
                category: data.category,
                rules: data.rules,
                prerequisites: data.prerequisites,
                general_rules: data.general_rules,
                thumbnail: data.thumbnail,
                startTime: new Date(data.startTime),
                endTime: data.endTime ? new Date(data.endTime) : null,
                costs: parseInt(data.costs),
                teamEvent: data.teamEvent,
                facultyCoordinators: data.facultyCoordinators,
                studentCoordinators: data.studentCoordinators,
            },
        });

        return NextResponse.json(event, {
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                Pragma: "no-cache",
                Expires: "0",
            },
        });
    } catch (error) {
        console.error("Error creating event:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
