"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { updateVideoStatusAction } from "../actions";

type Props = {
  children: React.ReactNode;
  variant?: "outline" | null;
  videoId: string;
  creatorId: string;
  status: string;
};

export const StatusBtn = (props: Props) => {
  const { execute, isPending } = useServerAction(updateVideoStatusAction, {
    onError({ err }) {
      console.log(err);
      toast.message(err?.message ?? "Something went wrong");
    },
    onSuccess() {
      toast.success("Status Updated");
    },
  });
  const handleVideoStatus = async () => {
    execute({
      videoId: props.videoId,
      creatorId: props.creatorId,
      status: props.status,
    });
  };

  return (
    <Button
      onClick={handleVideoStatus}
      variant={props.variant}
      disabled={isPending}
      className="w-28"
    >
      {props.children}
    </Button>
  );
};
