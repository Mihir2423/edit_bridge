"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PenToolIcon, EditIcon, Loader2 } from "lucide-react";
import { useServerAction } from "zsa-react";
import { setRoleAction } from "../actions";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function RoleSelector() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const { data: session, update } = useSession();
  const { execute, isPending } = useServerAction(setRoleAction, {
    onError({ err }) {
      toast.message("Something went wrong");
    },
    onSuccess() {
      toast.success("Role updated successfully");
    },
  });

  const handleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleConfirm = async () => {
    if (selectedRole) {
      console.log(`Confirmed role: ${selectedRole}`);
      await execute({ userType: selectedRole });
      const result = await update({
        ...session,
        user: {
          ...session?.user,
          userType: selectedRole,
        },
      });

      if (result) {
        console.log("Session updated:", result);
        toast.success("Session refreshed");
      } else {
        toast.error("Failed to update session");
      }
      // Here you can add logic to proceed with the selected role
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-4xl">
        <h1 className="mb-8 font-bold text-3xl text-center text-gray-800">
          Choose Your Role
        </h1>
        <div className="flex md:flex-row flex-col gap-6 mb-8">
          <div
            className={`flex-1 p-6 rounded-lg border-2 transition-all cursor-pointer ${
              selectedRole === "creator"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
            }`}
            onClick={() => handleSelect("creator")}
          >
            <div className="flex flex-col items-center text-center">
              <PenToolIcon className="mb-4 w-16 h-16 text-blue-500" />
              <h2 className="mb-2 font-semibold text-2xl text-gray-800">
                Creator
              </h2>
              <p className="text-gray-600">Design and build new content</p>
            </div>
          </div>
          <div
            className={`flex-1 p-6 rounded-lg border-2 transition-all cursor-pointer ${
              selectedRole === "editor"
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-green-300"
            }`}
            onClick={() => handleSelect("editor")}
          >
            <div className="flex flex-col items-center text-center">
              <EditIcon className="mb-4 w-16 h-16 text-green-500" />
              <h2 className="mb-2 font-semibold text-2xl text-gray-800">
                Editor
              </h2>
              <p className="text-gray-600">
                Review and refine existing content
              </p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button
            className="px-8 py-2 text-lg"
            disabled={!selectedRole}
            onClick={handleConfirm}
          >
            Confirm Selection
            {isPending && <Loader2 className="ml-2 w-6 h-6 animate-spin" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
