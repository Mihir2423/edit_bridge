"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { utapi } from "@/uploadthing";
import { z } from "zod";
import axios from "axios";

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
    revalidatePath("/dashboard");
  });

