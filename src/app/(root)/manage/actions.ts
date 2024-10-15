"use server"


import { authenticatedAction } from "@/lib/safe-action";
import { assertAuthenticated } from "@/lib/session";
import { handleRequestsUseCase } from "@/use-cases/editor";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const handleRequestsAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      type: z.string(),
      requestId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const session = await assertAuthenticated();
    await handleRequestsUseCase(session, input.type, input.requestId);
    revalidatePath('/manage');
  });
