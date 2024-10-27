"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { assertAuthenticated } from "@/lib/session";
import { updateVideoStatusUseCase } from "@/use-cases/video";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateVideoStatusAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      videoId: z.string(),
      creatorId: z.string(),
      status: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const session = await assertAuthenticated();
    if (!session || !session.id || !session.userType)
      throw new Error("User not authenticated");
    const { id, userType } = session;
    if (userType !== "creator") throw new Error("User not authorized");
    await updateVideoStatusUseCase({
      userType,
      videoId: input.videoId,
      userId: id,
      creatorId: input.creatorId,
      status: input.status,
    });
    revalidatePath("/dashboard");
  });
