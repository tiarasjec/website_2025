import { getServerSideSession } from "@/lib/getServerSideSession";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSideSession();
        if (!session || session.user.role !== "SUPER_ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { isFinished } = await req.json();
        const event = await prisma.event.update({
            where: { id: params.id },
            data: { isFinished },
        });

        return NextResponse.json(event);
    } catch (error) {
        console.error("Error updating event status:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
