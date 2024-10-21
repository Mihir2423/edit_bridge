import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      // authorization: {
      //   params: {
      //     scope:
      //       "openid email profile https://www.googleapis.com/auth/youtube.force-ssl",
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //   },
      // },
    }),
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
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { id: true, userType: true, name: true, email: true },
        });
        return { ...token, ...dbUser };
      }
      return token;
    },
    async session({ session, token }) {
     session.user = {
       id: token.id as string,
       name: token.name,
       email: token.email as string,
       userType: token.userType,
       emailVerified: token.emailVerified as Date,
     };
     return session;
   },
  },
  session: {
    strategy: "jwt",
  },
});
