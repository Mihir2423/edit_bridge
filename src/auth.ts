import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const YouTubeProvider = GoogleProvider({
  clientId: process.env.AUTH_GOOGLE_ID,
  clientSecret: process.env.AUTH_GOOGLE_SECRET,
  authorization: {
    params: {
      scope:
        "openid email profile https://www.googleapis.com/auth/youtube.force-ssl",
      prompt: "consent",
      access_type: "offline",
      response_type: "code",
    },
  },
  id: "youtube",
  name: "YouTube",
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    YouTubeProvider,
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
    async jwt({ token, user, trigger, account, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (account && account.provider === "youtube") {
        token.youtube_access_token = account.access_token;
        token.youtube_refresh_token = account.refresh_token;

        // Store YouTube credentials in the database
        await prisma.account.update({
          where: {
            provider_providerAccountId: {
              provider: "google",
              providerAccountId: account.providerAccountId,
            },
          },
          data: {
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            scope: account.scope,
            token_type: account.token_type,
            expires_at: account.expires_at,
          },
        });
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
        youtube_access_token: token.youtube_access_token as string | undefined,
      };
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
