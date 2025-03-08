import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export const revalidate = 0;

const CoordinatorSchema = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().optional(),
});

export async function GET(request: Request, { params }: { params: { category: string } }) {
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
                category: true,
                isFinished: true,
                costs: true,
                teamEvent: true,
                description: true,
                rules: true,
                prerequisites: true,
                general_rules: true,
                thumbnail: true,
                startTime: true,
                endTime: true,
                facultyCoordinators: true,
                studentCoordinators: true,
            },
        });

        if (!events.length) {
            return new NextResponse("Category not found", { status: 404 });
        }

        const formattedEvents = events.map((event) => {
            // Parse coordinators safely using Zod
            const facultyCoordinators = Array.isArray(event.facultyCoordinators)
                ? event.facultyCoordinators
                      .map((coord) => CoordinatorSchema.safeParse(coord))
                      .filter(
                          (result): result is z.SafeParseSuccess<z.infer<typeof CoordinatorSchema>> =>
                              result.success
                      )
                      .map((result) => result.data)
                : [];

            const studentCoordinators = Array.isArray(event.studentCoordinators)
                ? event.studentCoordinators
                      .map((coord) => CoordinatorSchema.safeParse(coord))
                      .filter(
                          (result): result is z.SafeParseSuccess<z.infer<typeof CoordinatorSchema>> =>
                              result.success
                      )
                      .map((result) => result.data)
                : [];

            return {
                id: event.id,
                name: event.name,
                costs: event.costs,
                team: event.teamEvent,
                description: event.description,
                rules: event.rules,
                prerequisites: event.prerequisites,
                general_rules: event.general_rules,
                thumbnail: event.thumbnail,
                startTime: event.startTime,
                endTime: event.endTime,
                isFinished: event.isFinished,
                facultyCoordinators,
                studentCoordinators,
            };
        });

        return NextResponse.json(formattedEvents, {
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                Pragma: "no-cache",
                Expires: "0",
            },
        });
    } catch (error) {
        console.error("Error fetching events by category:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
