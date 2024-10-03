import "server-only";

import {
  getAllEditors,
  getUserBySlug,
  getAllCreators,
  hireEditor,
  applyAsEditor,
  getEditorRequests,
} from "@/data-access/editor";
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

export async function hireEditorUseCase(session: Session | null, id: string) {
  if (!session) {
    throw new AuthenticationError();
  }
  await hireEditor(session, id);
}

export async function applyAsEditorUseCase(
  session: Session | null,
  id: string
) {
  if (!session) {
    throw new AuthenticationError();
  }
  await applyAsEditor(session, id);
}

export async function requestsUseCase(session: Session) {
  if (!session) {
    throw new AuthenticationError();
  }
  const res = await getEditorRequests(session.user.id);
  return res;
}
