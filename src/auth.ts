import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "ID", type: "text" },
        salt: { label: "Salt", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.id || !credentials?.salt) return null;
        const user = await prisma.user.findUnique({
          where: {
            id: credentials.id as string,
            salt: credentials.salt as string,
          },
        });
        if (!user) return null;
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
     if (trigger  === "update") {
        return { ...token, ...session.user };
     }
      if (user) {
       return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token as any
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
