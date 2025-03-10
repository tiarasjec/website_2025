import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function getServerSideSession() {
    return await getServerSession(authOptions);
}
