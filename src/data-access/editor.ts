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
      request_send: {
        select: {
          receiverId: true,
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
    include: {
      request_received: {
        select: {
          senderId: true,
        },
      },
      request_send: {
        select: {
          receiverId: true,
        },
      },
    },
  });
  return editors;
}

async function getUserById(id: string) {
  const editor = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      previousWork: true,
      request_send: true,
      request_received: true,
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
      request_send: {
        select: {
          receiverId: true,
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
  const editor = await getUserById(id);
  if (!editor) {
    throw new Error("Editor not found");
  }
  if (editor.userType !== "editor") {
    throw new Error("User is not an editor");
  }
  // check if the request is already sent or recieved i.e if the creator has already hired the editor or the editor has sent the request to the creator
  const existingRequest = await prisma.request.findFirst({
    where: {
      OR: [
        {
          AND: [
            {
              senderId: session.user.id,
            },
            {
              receiverId: editor.id,
            },
          ],
        },
        {
          AND: [
            {
              senderId: editor.id,
            },
            {
              receiverId: session.user.id,
            },
          ],
        },
      ],
    },
  });
  if (existingRequest) {
    throw new Error("Request already sent");
  }
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

export async function applyAsEditor(session: Session, id: string) {
  // the editor will be the one applying as editor
  if (session.user.userType !== "editor") {
    throw new Error("Only editors can apply as editors");
  }
  const creator = await getUserById(id);
  if (!creator) {
    throw new Error("Creator not found");
  }
  if (creator.userType !== "creator") {
    throw new Error("User is not an Creator");
  }
  // check if the request is already sent or recieved i.e if the editor has already applied or the creator has sent the request to the user
  const existingRequest = await prisma.request.findFirst({
    where: {
      OR: [
        {
          AND: [
            {
              senderId: session.user.id,
            },
            {
              receiverId: creator.id,
            },
          ],
        },
        {
          AND: [
            {
              senderId: creator.id,
            },
            {
              receiverId: session.user.id,
            },
          ],
        },
      ],
    },
  });
  if (existingRequest) {
    throw new Error("Request already sent");
  }
  const applyRequest = await prisma.request.create({
    data: {
      type: "apply",
      status: "pending",
      sender: {
        connect: { id: session.user.id },
      },
      receiver: {
        connect: { id: creator.id },
      },
    },
  });

  return applyRequest;
}

async function getEditorRequestsByUserId(id: string) {
  const editor = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      userType: true,
      request_received: {
        select: {
          id: true,
          status: true,
          createdAt: true,
          sender: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
      request_send: {
        select: {
          id: true,
          status: true,
          createdAt: true,
          receiver: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
  return editor;
}

export async function getEditorRequests(userId: string) {
  const editor = await getEditorRequestsByUserId(userId);
  if (!editor) {
    throw new Error("User not found");
  }

  // Determine which requests to use based on userType
  const requests =
    editor.userType === "creator"
      ? editor.request_received
      : editor.request_send;

  // Use a type guard to determine the shape of each request
  const flattenedRequests = requests.map((request) => {
    if ("sender" in request) {
      return {
        id: request.id,
        createdAt: request.createdAt,
        status: request.status,
        sender: request.sender,
      };
    } else {
      return {
        id: request.id,
        createdAt: request.createdAt,
        status: request.status,
        sender: request.receiver,
      };
    }
  });

  return flattenedRequests;
}
