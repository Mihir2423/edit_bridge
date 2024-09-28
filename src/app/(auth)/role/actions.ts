"use server";

import { auth, signIn } from "@/auth";
import {
 getUserAccount,
 getUserByEmail,
 setUserRole,
} from "@/data-access/users";
import { authenticatedAction } from "@/lib/safe-action";
import { z } from "zod";

export const setRoleAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      userType: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const session = await auth();
    if (!session?.user?.email) {
      throw new Error("User not authenticated");
    }

    const user = await getUserByEmail(session.user.email);
    if (!user) {
      throw new Error("User not found");
    }

    if (input.userType === "creator") {
      const account = await getUserAccount(user.id);
      if (
        !account ||
        !account.some((provider) => provider.provider === "google")
      ) {
        await signIn("google");
      }
    }
    await setUserRole(user.id, input.userType);

    return { success: true };
  });

export const googleSignInAction = async () => {
  "use server";
  await signIn("google");
};
