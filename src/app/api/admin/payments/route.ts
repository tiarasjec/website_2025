import { getServerSideSession } from "@/lib/getServerSideSession";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export async function GET() {
    const session = await getServerSideSession();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== UserRole.ADMIN && session.user.role !== UserRole.SUPER_ADMIN) {
        return NextResponse.json({ message: "Forbidden", isOk: false }, { status: 403 });
    }

    const payments = await prisma.payment.findMany({
        include: {
            user: true,
        },
    });
    return NextResponse.json(payments);
}
