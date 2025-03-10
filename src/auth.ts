import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
import Google, { GoogleProfile } from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            role: UserRole;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: UserRole;
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
    },
    // For Auth.js beta, use trustHost and specific cookie configuration
    trustHost: true,
    cookies: {
        sessionToken: {
            name: "next-auth.session-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
        csrfToken: {
            name: "next-auth.csrf-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    },
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            profile(profile: GoogleProfile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: (profile.role as UserRole) ?? UserRole.PARTICIPANT,
                };
            },
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token }) {
            if (!token.sub) return token;
            const user = await prisma.user.findUnique({
                where: { id: token.sub },
            });
            if (!user) return token;
            token.role = user.role;
            return token;
        },
        session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    role: token.role,
                },
            };
        },
    },
});
