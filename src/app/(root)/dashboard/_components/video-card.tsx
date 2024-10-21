import { Modal } from "@/components/globals/modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { EditVideoContent } from "./edit-video-content";
import { ErrorImage } from "@/components/globals/error-image";

type Props = {
  title: string;
  description: string;
  thumbnail: string;
  editorName: string | null;
  editorImage: string | null;
  slug: string;
};

export const VideoCard = ({
  title,
  slug,
  description,
  thumbnail,
  editorName,
  editorImage,
}: Props) => {
  return (
    <Card>
      <CardContent className="relative flex flex-col gap-4 p-4 rounded-md group">
        {editorName && editorImage && (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={editorImage} />
                <AvatarFallback className="p-1 text-xs">ED</AvatarFallback>
              </Avatar>
              <h1 className="text-base text-black">{editorName}</h1>
            </div>
            <DotsVerticalIcon />
          </div>
        )}
        <div className="group-hover:blur-sm flex flex-col gap-4">
          <ErrorImage
            src={thumbnail}
            alt="video"
            width={300}
            height={300}
            className="rounded-md w-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-base">{title.length > 30 ? `${title.substring(0, 30)}...` : title}</h1>
            <p className="font-normal text-[#787486] text-sm">{description.length > 130 ? `${description.substring(0, 130)}...` : description}</p>
          </div>
        </div>
        <div className="top-1/2 left-1/2 z-[10] absolute flex justify-center items-center gap-2 opacity-0 group-hover:opacity-[1] transition-all -translate-x-1/2 -translate-y-1/2 group-hover:translate-y-[-20px] duration-150 ease-in-out">
          <Link href={`/dashboard/${slug}`} className="cursor-pointer">
            <Image src="/images/link.svg" width={24} height={24} alt="Link" />
          </Link>
          <Modal
            title="Edit Details"
            content={
              <EditVideoContent
                title={title}
                description={description}
                preview={thumbnail}
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
