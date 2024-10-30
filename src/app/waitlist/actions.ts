"use server";

import prisma from "@/lib/db";
import { unauthenticatedAction } from "@/lib/safe-action";
import { z } from "zod";

export const addToWaitListAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
    })
  )
  .handler(async ({ input }) => {
    try {
      // Add To Waitlist Logic
      const isExisting = await prisma.waitlist.findFirst({
        where: {
          email: input.email,
        },
      });

      if (isExisting) {
        throw new Error("Email already exists in the waitlist");
      }

      const newEntry = await prisma.waitlist.create({
        data: {
          email: input.email,
        },
      });

      return { success: true, data: newEntry };
    } catch (error) {
      // Better error handling
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to add email to waitlist");
    }
  });
