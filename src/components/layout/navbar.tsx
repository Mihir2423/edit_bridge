import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { assertAuthenticated } from "@/lib/session";
import { getCurrentUserUseCase } from "@/use-cases/users";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { signOut } from "@/auth";
import { LogOut, User } from "lucide-react";

export const Navbar = async () => {
  const session = await assertAuthenticated();
  const currentUser = await getCurrentUserUseCase(session?.id);
  return (
    <div className="top-0 left-0 z-[1] fixed flex justify-end items-center border-[#DBDBDB] bg-white pr-12 border-b w-full h-[72px]">
      <div className="flex items-center gap-6">
        <Image
          src="/images/message-question.svg"
          width={26}
          height={24}
          alt="Logo"
        />
        <button type="button" className="relative">
          <div className="top-0 right-1 absolute bg-red-500 rounded-full size-[7px]" />
          <Image
            src="/images/notification.svg"
            width={26}
            height={24}
            alt="Logo"
          />
        </button>
        <div className="flex items-center gap-5">
          {currentUser?.name && (
            <div className="flex flex-col justify-between">
              <h1 className="text-right font-normal text-[#0D062D] text-sm">
                {currentUser?.name}
              </h1>
              {currentUser?.city && (
                <p className="text-right font-normal text-[#787486] text-sm">
                  {currentUser?.city}, {currentUser?.country}
                </p>
              )}
            </div>
          )}
          <div className="flex items-center gap-[10px]">
            <Avatar className="w-10 h-10">
              <AvatarImage src={currentUser?.image as string} />
              <AvatarFallback className="p-1 text-xs">ED</AvatarFallback>
            </Avatar>
            <Popover>
              <PopoverTrigger>
                <Image
                  alt="arrow-down"
                  src="/images/arrow-down.svg"
                  width={18}
                  height={18}
                />
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="flex flex-col gap-2 border border-black w-[190px]"
              >
                <Link
                  href="/profile"
                  type="button"
                  className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md hover:scale-[1.05] w-full text-left transition-all duration-150 ease-in-out"
                >
                  <User size={18} /> Profile
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <button
                    type="submit"
                    className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md hover:scale-[1.05] w-full text-left transition-all duration-150 ease-in-out"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </form>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};
