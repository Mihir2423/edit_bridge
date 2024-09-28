import type { DefaultSession, DefaultUser } from "next-auth"
import type { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      userType: string | null
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    userType: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userType: string | null
  }
}