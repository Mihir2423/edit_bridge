import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SquareMousePointer, User } from "lucide-react";
import Link from "next/link";
import { ApplyBtn } from "./apply-btn";
import { assertAuthenticated } from "@/lib/session";
import { isInRequestList } from "@/lib/utils";

export const CreatorCard = async ({ data }: { data: Profile }) => {
  const currUser = await assertAuthenticated();
  return (
    <Card className="relative flex flex-col gap-4 shadow-md p-4 rounded-md group">
      <div className="flex flex-col items-center gap-2">
        <div className="border-[4px] mb-2 p-1 border-red-600 rounded-full boder">
          <Avatar className="w-32 h-32">
            <AvatarImage src={data?.image as string} />
            <AvatarFallback className="p-1 text-xs">ED</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col">
          <h1 className="font-semibold text-base text-black leading-[12px]">
            {data?.name ?? "Creator Name"}
          </h1>
          <h4 className="text-center text-gray-500 text-xs">
            {"creator_name"}
          </h4>
        </div>
        <p className="font-normal text-[#787486] text-center text-sm">
          {data?.bio ?? "Creator Bio"}
        </p>
        <div className="gap-2 grid grid-cols-2 w-full">
          {!isInRequestList(
            currUser?.id,
            data?.request_received,
            data?.request_send
          ) && <ApplyBtn creatorId={data?.id} />}
          <Button
            asChild
            className={`flex items-center gap-2 ${isInRequestList(currUser?.id, data?.request_received, data?.request_send) ? "col-span-2" : "col-span-1"} w-full`}
          >
            <Link href={`/creator/${data?.slug}`}>
              View <SquareMousePointer size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};
