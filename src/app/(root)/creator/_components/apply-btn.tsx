"use client";

import { Button } from "@/components/ui/button";
import { Loader2, User } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { applyAsEditorAction } from "../actions";

type Props = {
 creatorId: string;
};

export const ApplyBtn = ({ creatorId }: Props) => {
  const { execute, isPending } = useServerAction(applyAsEditorAction, {
    onError({ err }) {
      console.log(err);
      toast.message("Something went wrong");
    },
    onSuccess() {
      toast.success("Request sent successfully");
    },
  });
  const handleHire = async () => {
    execute({ id: creatorId });
  };
  return (
    <Button
      onClick={handleHire}
      disabled={isPending}
      className="flex items-center gap-2 col-span-1 w-full"
    >
      Apply {isPending ? <Loader2 size={16} className="animate-spin" /> : <User size={16} />}
    </Button>
  );
};
