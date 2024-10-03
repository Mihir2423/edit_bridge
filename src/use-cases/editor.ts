import { getAllEditors, getUserBySlug, getAllCreators } from "@/data-access/editor";
import { AuthenticationError } from "@/lib/utils";
import { Session } from "next-auth";

export async function getAllEditorsUseCase(
  session: Omit<Session, "user" | "expires">
) {
  if (!session) {
    throw new AuthenticationError();
  }
  const res = await getAllEditors();
  return res;
}
export async function getAllCreatorsUseCase(
  session: Omit<Session, "user" | "expires">
) {
  if (!session) {
    throw new AuthenticationError();
  }
  const res = await getAllCreators();
  return res;
}
export async function getUserBySlugUseCase(
  session: Omit<Session, "user" | "expires">,
  slug: string
) {
  if (!session) {
    throw new AuthenticationError();
  }
  const res = await getUserBySlug(slug);
  return res;
}
