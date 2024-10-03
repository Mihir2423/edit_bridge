"use server"


import { auth } from "@/auth";
import { authenticatedAction } from "@/lib/safe-action";
import { hireEditorUseCase } from "@/use-cases/editor";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const hireEditorAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      id: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const session = await auth();
    await hireEditorUseCase(session, input.id);
    revalidatePath('/manage');
  });
