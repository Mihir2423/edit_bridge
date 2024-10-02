import React from "react";
import { Profile } from "./_components/profile";
import { BreadCrumb } from "@/components/globals/breadcrumb";

type Props = {};

const ProfilePage = (props: Props) => {
  return (
    <div className="">
      <BreadCrumb
        links={[{ name: "Home", path: "/" }]}
        page="Profile"
      />
      <Profile />
    </div>
  );
};

export default ProfilePage;
