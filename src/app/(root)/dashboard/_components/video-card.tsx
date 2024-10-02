import { Modal } from "@/components/globals/modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { EditVideoContent } from "./edit-video-content";

export const VideoCard = () => {
  return (
    <Card>
      <CardContent className="relative flex flex-col gap-4 p-4 rounded-md group">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={"/demos/profile-pic.png"} />
              <AvatarFallback className="p-1 text-xs">ED</AvatarFallback>
            </Avatar>
            <h1 className="text-base text-black">Editor Name</h1>
          </div>
          <DotsVerticalIcon />
        </div>
        <div className="group-hover:blur-sm flex flex-col gap-4">
          <Image
            src="https://images.unsplash.com/photo-1726533815259-8fe320ac2493?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
            alt="video"
            width={300}
            height={300}
            className="rounded-md w-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-base">Title goes here...</h1>
            <p className="font-normal text-[#787486] text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="top-1/2 left-1/2 z-[10] absolute flex justify-center items-center gap-2 opacity-0 group-hover:opacity-[1] transition-all -translate-x-1/2 -translate-y-1/2 group-hover:translate-y-[-20px] duration-150 ease-in-out">
          <Link href="/dashboard/12" className="cursor-pointer">
            <Image src="/images/link.svg" width={24} height={24} alt="Link" />
          </Link>
          <Modal
            title="Edit Details"
            content={
              <EditVideoContent
                title={"Title goes here"}
                description={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                }
                preview={"/demos/thumbnail.jpg"}
              />
            }
          >
            <Image src="/images/edit.svg" width={24} height={24} alt="Edit" />
          </Modal>
        </div>
      </CardContent>
    </Card>
  );
};
