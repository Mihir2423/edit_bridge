"use server"

import { auth } from "@/auth";
import { authenticatedAction } from "@/lib/safe-action";
import { applyAsEditorUseCase } from "@/use-cases/editor";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const applyAsEditorAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      id: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const session = await auth();
    await applyAsEditorUseCase(session, input.id);
    revalidatePath('/manage');
  });
