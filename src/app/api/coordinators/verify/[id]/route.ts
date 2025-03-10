import { prisma } from "@/lib/prisma";
import { getServerSideSession } from "@/lib/getServerSideSession";
import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "@prisma/client";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
    const session = await getServerSideSession();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = context.params;

    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });

    if (!user) {
        return NextResponse.json({ error: "User not found", isOk: false }, { status: 404 });
    }

    return NextResponse.json({ user, isOk: true }, { status: 200 });
}
