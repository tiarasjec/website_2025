import { prisma } from "@/lib/prisma";
import { getServerSideSession } from "@/lib/getServerSideSession";

import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "@prisma/client";

export async function POST(request: NextRequest, context: { params: { id: string } }) {
    const session = await getServerSideSession();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== UserRole.SUPER_ADMIN) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = context.params;
    const user = await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            role: UserRole.ADMIN,
        },
    });
    return NextResponse.json({ user }, { status: 200 });
}
