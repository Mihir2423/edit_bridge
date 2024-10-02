import React, { Suspense } from "react";
import { Profile } from "./_components/profile";
import { BreadCrumb } from "@/components/globals/breadcrumb";
import { assertAuthenticated } from "@/lib/session";
import { getCurrentUserUseCase } from "@/use-cases/users";
import { ProfilePreloader } from "./_components/profile-preloader";

type Props = {};

const ProfilePage = async (props: Props) => {
  const session = await assertAuthenticated();
  const currentUser = await getCurrentUserUseCase(session?.id);
  return (
    <Suspense fallback={<ProfilePreloader />}>
      <div className="">
        <BreadCrumb links={[{ name: "Home", path: "/" }]} page="Profile" />
        <Profile data={currentUser as User} />
      </div>
    </Suspense>
  );
};

export default ProfilePage;
