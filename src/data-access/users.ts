import "server-only";

import prisma from "@/lib/db";
import { hashPassword } from "@/use-cases/utils";
import crypto from "crypto";

export async function createUser(
  email: string,
  password?: string,
  salt?: string
) {
  if (password && salt) {
    const user = await prisma.user.create({
      data: { email, password, salt },
    });
    return user;
  }
  const user = await prisma.user.create({
    data: { email },
  });
  return user;
}

export async function createMagicUser(email: string) {
  const salt = crypto.randomBytes(128).toString("base64");
  const user = await prisma.user.create({
    data: { email, emailVerified: new Date(), salt },
  });
  await prisma.account.create({
    data: {
      userId: user.id,
      provider: "email",
      providerAccountId: email,
      type: "email",
    },
  });
  return user;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      previousWork: true,
    },
  });

  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
}

export async function setEmailVerified(
  userId: string,
  magicUser: boolean = false
) {
  const data = magicUser
    ? { emailVerified: new Date() }
    : { emailVerified: new Date() };
  const user = await prisma.user.update({
    where: { id: userId },
    data,
  });
  return user;
}

export async function verifyPassword(email: string, password: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    return false;
  }
  const salt = user.salt;
  const savedPass = user.password;
  if (!salt || !savedPass) {
    return false;
  }
  const hash = await hashPassword(password, salt);
  return hash === savedPass;
}

export async function updatePassword(
  userId: string,
  password: string,
  trx = prisma
) {
  const salt = crypto.randomBytes(128).toString("base64");
  const hash = await hashPassword(password, salt);
  await trx.user.update({
    where: { id: userId },
    data: { password: hash, salt },
  });
}

export async function setUserRole(userId: string, role: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { userType: role },
  });
}

export async function getUserAccount(userId: string) {
  const accounts = await prisma.account.findMany({
    where: { userId },
  });
  return accounts;
}
