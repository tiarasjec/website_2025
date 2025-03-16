import { getServerSideSession } from "@/lib/getServerSideSession";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: { event: string } }) {
    const session = await getServerSideSession();
    if (!session) {
        return NextResponse.json({ isOk: false, message: "You are not logged in" }, { status: 401 });
    }
    if (session.user.role === UserRole.PARTICIPANT) {
        return NextResponse.json(
            { isOk: false, message: "You are not authorized to access this page" },
            { status: 403 }
        );
    }
    const { event } = context.params;
    const users = await prisma.user.findMany({
        where: {
            events: {
                has: event,
            },
        },
    });
    const totalRegistrations = await prisma.user.count({
        where: {
            events: {
                has: event,
            },
        },
    });
    return NextResponse.json({ users, totalRegistrations, isOk: true }, { status: 200 });
}
