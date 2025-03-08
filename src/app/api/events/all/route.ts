import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export const revalidate = 0;

// Zod schema for coordinator validation
const CoordinatorSchema = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().optional(),
});

export async function GET() {
    try {
        const events = await prisma.event.findMany({
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

                acc[category].events[0][event.id] = {
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

                return acc;
            },
            {} as Record<
                string,
                {
                    events: Array<
                        Record<
                            string,
                            {
                                name: string;
                                costs: number;
                                team: boolean;
                                description: string;
                                rules: string[];
                                prerequisites: string[];
                                general_rules: string[];
                                thumbnail: string;
                                startTime: Date;
                                endTime: Date | null;
                                isFinished: boolean;
                                facultyCoordinators: z.infer<typeof CoordinatorSchema>[];
                                studentCoordinators: z.infer<typeof CoordinatorSchema>[];
                            }
                        >
                    >;
                }
            >
        );

        return NextResponse.json(categorizedEvents, {
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                Pragma: "no-cache",
                Expires: "0",
            },
        });
    } catch (error) {
        console.error("Error fetching all events:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
