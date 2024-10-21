"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { assertAuthenticated } from "@/lib/session";
import { createVideoUseCase } from "@/use-cases/video";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Server action
export const createVideoAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
      thumbnail: z.string(),
      video: z.string(),
      createdForId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const session = await assertAuthenticated();
    await createVideoUseCase({ input, userId: session.id });
    console.log("Handling request", input);
    revalidatePath("/dashboard");
  });
