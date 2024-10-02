import { Session } from "next-auth";

export function isProfileUser(session: Session, userId: string) {
  if (!session) return false;
  return session.user.id === userId;
}
