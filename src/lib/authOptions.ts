import { DefaultSession, Profile, type NextAuthOptions, type Session as NextAuthSession } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import { identity } from "lodash";
import { getUserById } from "@/app/actions/get-user-by-id";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: UserRole;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: UserRole;
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ profile }: { profile?: Profile }) {
            if (!profile?.email) return false;

            return true;
        },

        async jwt({ token, user }: { token: JWT; user: any }): Promise<any> {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    role: user.role,
                };
            }
            if (token.id) {
                const updateUser = await getUserById(token.id as string);
                return {
                    ...token,
                    role: updateUser?.role,
                };
            }
            return token;
        },
        async session({ session, token }: { session: NextAuthSession; token: JWT }): Promise<any> {
            return {
                ...session,
                user: {
                    ...session.user,
                    role: token.role,
                    id: token.id,
                },
            };
        },
    },

    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export const handlers = NextAuth(authOptions);
