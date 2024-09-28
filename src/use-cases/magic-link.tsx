import { applicationName } from "@/app-config";
import { signIn } from "@/auth";
import {
  deleteMagicLinkByToken,
  getMagicLinkByToken,
  upsertMagicLink,
} from "@/data-access/magic-links";
import {
  createMagicUser,
  getUserByEmail,
  setEmailVerified,
} from "@/data-access/users";
import { MagicLinkEmail } from "@/emails/magic-link";
import { sendEmail } from "@/lib/send-email";

export async function sendMagicLinkUseCase(email: string) {
  const token = await upsertMagicLink(email);
  try {
    await sendEmail(
      email,
      `Your magic login link for ${applicationName}`,
      MagicLinkEmail({ token })
    );
  } catch (error) {
    console.error("Error sending email from magic-link.tsx:", error);

    // Redirect to the fallback route
    return { redirect: "/sign-in/magic/email" };
  }
}

export async function loginWithMagicLinkUseCase(token: string) {
  const magicLinkInfo = await getMagicLinkByToken(token);
  if (!magicLinkInfo) {
    throw new Error("Token not found");
  }

  if (magicLinkInfo.tokenExpiresAt! < new Date()) {
    throw new Error("Token expired");
  }
  const existingUser = await getUserByEmail(magicLinkInfo.email);
  if (existingUser) {
    await setEmailVerified(existingUser.id, true);
    console.log("HERE");

    await signIn("credentials", {
      id: existingUser.id,
      salt: existingUser.salt,
      redirect: false,
    });
    console.log("HERE");

    await deleteMagicLinkByToken(token);
    return existingUser;
  } else {
    const newUser = await createMagicUser(magicLinkInfo.email);
    console.log("HERE NEW");
    await signIn("credentials", {
      id: newUser.id,
      salt: newUser.salt,
      redirect: false,
    });
    console.log("HERE NEW");
    await deleteMagicLinkByToken(token);
    return newUser;
  }
}
