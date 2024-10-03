import "server-only";

import prisma from "@/lib/db";
import { Session } from "next-auth";

export async function getAllEditors() {
  const editors = await prisma.user.findMany({
    where: {
      userType: "editor",
    },
    include: {
      request_received: {
        select: {
          senderId: true,
        },
      },
    },
  });
  return editors;
}
export async function getAllCreators() {
  const editors = await prisma.user.findMany({
    where: {
      userType: "creator",
    },
  });
  return editors;
}

async function getEditorById(id: string) {
  const editor = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      previousWork: true,
      request_send: true,
    },
  });
  return editor;
}

export async function getUserBySlug(slug: string) {
  const editor = await prisma.user.findUnique({
    where: {
      slug: slug,
    },
    include: {
      previousWork: true,
      request_received: {
        select: {
          senderId: true,
        },
      },
    },
  });
  return editor;
}

export async function hireEditor(session: Session, id: string) {
  // the creator will be the one hiring the editor
  if (session.user.userType !== "creator") {
    throw new Error("Only creators can hire editors");
  }
  const editor = await getEditorById(id);
  if (!editor) {
    throw new Error("Editor not found");
  }
  if (editor.userType !== "editor") {
    throw new Error("User is not an editor");
  }
  // check if the request is already sent
  const existingRequest = await prisma.request.findFirst({
    where: {
      AND: [
        {
          senderId: session.user.id,
        },
        {
          receiverId: editor.id,
        },
      ],
    },
  });
  const hireRequest = await prisma.request.create({
    data: {
      type: "hire",
      status: "pending",
      sender: {
        connect: { id: session.user.id },
      },
      receiver: {
        connect: { id: editor.id },
      },
    },
  });

  return hireRequest;
}
