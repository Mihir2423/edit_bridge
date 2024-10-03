import "server-only"

import prisma from "@/lib/db";

export async function getAllEditors() {
  const editors = await prisma.user.findMany({
    where: {
      userType: "editor",
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

export async function getUserBySlug(slug: string) {
  const editor = await prisma.user.findUnique({
    where: {
      slug: slug,
    },
    include: {
      previousWork: true,
    },
  });
  return editor;
}
