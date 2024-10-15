import "server-only";

import {
  getAllEditors,
  getUserBySlug,
  getAllCreators,
  hireEditor,
  applyAsEditor,
  getEditorRequests,
  handleRequests,
  getMyCreators,
  getMyEditors,
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

export async function getMyCreatorsUseCase(userId : string) {
  if (!userId) {
    throw new AuthenticationError();
  }
  // const res = await getMyCreators(session.id);
  const res = await getMyCreators(userId);
  if (!Array.isArray(res)) {
    return [];
  }
  const requiredRes = res.map((r) => {
    return {
      id: r.creator.id,
      name: r.creator.name,
      email: r.creator.email,
      slug: r.creator.slug,
      bio: r.creator.bio,
      image: r.creator.image,
      request_received: r.creator.request_received,
      request_send: r.creator.request_send,
    };
  }).filter((r) => r);
  return requiredRes;
}
export async function getMyEditorsUseCase(userId : string) {
  if (!userId) {
    throw new AuthenticationError();
  }
  // const res = await getMyCreators(session.id);
  const res = await getMyEditors(userId);
  if (!Array.isArray(res)) {
    return [];
  }
  const requiredRes = res.map((r) => {
    return {
      id: r.editor,
      name: r.editor.name,
      email: r.editor.email,
      slug: r.editor.slug,
      bio: r.editor.bio,
      image: r.editor.image,
      request_received: r.editor.request_received,
      request_send: r.editor.request_send,
    };
  }).filter((r) => r);
  return requiredRes;
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
  id: string,
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

export async function handleRequestsUseCase(session: any, type: string, requestId: string) {
  if (!session) {
    throw new AuthenticationError();
  }
  await handleRequests({type, userId: session.id, requestId});
}
