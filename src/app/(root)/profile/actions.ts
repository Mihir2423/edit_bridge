"use server";

import { auth } from "@/auth";
import { generateUniqueSlug } from "@/data-access/utils";
import { unauthenticatedAction } from "@/lib/safe-action";
import { updateProfileUseCase } from "@/use-cases/profile";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const WorkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  url: z.string().url("Invalid URL for work link"),
  platform: z.string().optional(),
});

export const updateProfileAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      id: z.string(),
      name: z.string().min(1, "Name is required"),
      image: z.string().url("Invalid profile picture URL").optional(),
      city: z.string().min(1, "City is required"),
      country: z.string().min(1, "Country is required"),
      bio: z.string().min(1, "About section is required"),
      previousWork: z.array(WorkSchema),
      socials: z.array(z.string()).optional(),
      email: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const session = await auth();
    const slug = await generateUniqueSlug(input.name);
    await updateProfileUseCase(session, {...input, slug});
    revalidatePath('/dashboard');
  });
