import React from "react";
import { VideoUploadForm } from "./_components/video-upload-form";
import { getMyCreatorsUseCase, getMyEditorsUseCase } from "@/use-cases/editor";
import { assertAuthenticated } from "@/lib/session";
import { redirect } from "next/navigation";
import { BreadCrumb } from "@/components/globals/breadcrumb";

type Props = {};

const CreatePage = async (props: Props) => {
  const session = await assertAuthenticated();
  if (!session || session.userType === "creator") {
    redirect("/dashboard");
  }
  const myCreators = await getMyCreatorsUseCase(session.id);
  const creators =
    myCreators?.map((creator) => {
      return {
        id: creator.id,
        name: creator.name,
        email: creator.email,
        image: creator.image,
      };
    }) || [];
  return (
    <>
      <BreadCrumb
        links={[{ name: "Home", path: "/dashboard" }]}
        page="Create Video"
      />
      <VideoUploadForm creators={creators} />;
    </>
  );
};

export default CreatePage;
