import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SquareMousePointer, User } from "lucide-react";
import Link from "next/link";
import React from "react";

export const EditorCard = () => {
  return (
    <Card className="relative flex flex-col gap-4 shadow-md p-4 rounded-md group">
      <div className="flex flex-col items-center gap-2">
        <div className="border-[4px] mb-2 p-1 border-red-600 rounded-full boder">
          <Avatar className="w-32 h-32">
            <AvatarImage src={"/demos/profile-pic.png"} />
            <AvatarFallback className="p-1 text-xs">ED</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col">
          <h1 className="font-semibold text-base text-black leading-[12px]">
            Editor Name
          </h1>
          <h4 className="text-center text-gray-500 text-xs">{"editor_name"}</h4>
        </div>
        <p className="font-normal text-[#787486] text-center text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="gap-2 grid grid-cols-2 w-full">
          <Button className="flex items-center gap-2 col-span-1 w-full">
            Hire <User size={16} />
          </Button>
          <Button asChild className="flex items-center gap-2 col-span-1 w-full">
            <Link href="/editor/12">
              View <SquareMousePointer size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};
