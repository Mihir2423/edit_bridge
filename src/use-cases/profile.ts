import { Session } from "next-auth";
import { AuthenticationError, UnauthorizedError } from "./errors";
import { isProfileUser } from "./authorization";
import { updateProfile } from "@/data-access/profile";

export async function updateProfileUseCase(authenticatedUser: Session | null, data: any) {
  if (!authenticatedUser) {
    throw new AuthenticationError();
  }
  if (!isProfileUser(authenticatedUser, data.id)) {
    return new UnauthorizedError();
  }
  const res = await updateProfile(data);
  return res;
}
