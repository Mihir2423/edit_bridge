"use client";

import { Button } from "@/components/ui/button";
import { Loader2, User } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { hireEditorAction } from "../actions";

type Props = {
  editorId: string;
};

export const HireBtn = ({ editorId }: Props) => {
  const { execute, isPending } = useServerAction(hireEditorAction, {
    onError({ err }) {
      console.log(err);
      toast.message("Something went wrong");
    },
    onSuccess() {
      toast.success("Request sent successfully");
    },
  });
  const handleHire = async () => {
    execute({ id: editorId });
  };
  return (
    <Button
      onClick={handleHire}
      disabled={isPending}
      className="flex items-center gap-2 col-span-1 w-full"
    >
      Hire {isPending ? <Loader2 size={16} className="animate-spin" /> : <User size={16} />}
    </Button>
  );
};
