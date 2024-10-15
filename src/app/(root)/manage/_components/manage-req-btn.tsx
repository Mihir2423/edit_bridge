"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useServerAction } from "zsa-react";
import { handleRequestsAction } from "../actions";
import { toast } from "sonner";

type Props = {
  type: "approve" | "reject" | "cancel";
  requestId: string;
};

export const ManageRequestBtn = ({ type, requestId }: Props) => {
  const { execute, isPending } = useServerAction(handleRequestsAction, {
    onError({ err }) {
      console.log(err);
      toast.message("Something went wrong");
    },
    onSuccess() {
      toast.success(
        type === "approve"
          ? "Request approved"
          : type === "reject"
            ? "Request rejected"
            : "Request canceled"
      );
    },
  });
  const handleHire = async () => {
    execute({ type, requestId });
  };
  return (
    <Button
      size="sm"
      variant={type === "reject" || type === "cancel" ? "outline" : "default"}
      onClick={handleHire}
      disabled={isPending}
      className={
        type === "approve"
          ? "bg-green-500 hover:bg-green-600"
          : "hover:bg-red-50 border-red-500 text-red-500"
      }
    >
      {type === "approve" && (
        <>
          {!isPending ? (
            <CheckCircle className="mr-1 w-4 h-4" />
          ) : (
            <Loader2 className="mr-1 animate-spin size-4" />
          )}
          Approve
        </>
      )}
      {type === "reject" && (
        <>
          {!isPending ? (
            <XCircle className="mr-1 w-4 h-4" />
          ) : (
            <Loader2 className="mr-1 animate-spin size-4" />
          )}
          Reject
        </>
      )}
      {type === "cancel" && (
        <>
          {!isPending ? (
            <XCircle className="mr-1 w-4 h-4" />
          ) : (
            <Loader2 className="mr-1 animate-spin size-4" />
          )}
          Cancel
        </>
      )}
    </Button>
  );
};
