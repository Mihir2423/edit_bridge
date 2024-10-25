import { Button } from "@/components/ui/button";
import { VideoCard } from "./_components/video-card";
import { assertAuthenticated } from "@/lib/session";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getMyVideosUseCase } from "@/use-cases/video";
import { Card } from "@/components/ui/card";

const DashboardPage = async () => {
  const currUser = await assertAuthenticated();
  if (!currUser || !currUser.userType) {
    return <Card className="shadow-lg mx-auto max-w-4xl">Please sign in</Card>;
  }
  const myVideos = await getMyVideosUseCase({
    userType: currUser?.userType,
    userId: currUser?.id,
  });

  return (
    <div className="relative text-black">
      <div className="flex justify-between items-center mb-4 px-4 pb-2 border-b w-full">
        <h1 className="font-bold text-2xl text-black">Dashboard</h1>
        {currUser?.userType === "editor" && (
          <Button asChild>
            <Link
              href="/create"
              className="flex justify-center items-center gap-2 text-white"
            >
              <Plus size={16} />
              Create
            </Link>
          </Button>
        )}
      </div>
      <div className="z-[9] gap-6 grid grid-cols-4">
        {Array.isArray(myVideos) && myVideos.length > 0 ? (
          myVideos.map((video, index) => (
            <VideoCard
              slug={video.slug}
              thumbnail={video.thumbnail}
              title={video.title}
              description={video.description}
              editorName={video.user.name}
              editorImage={video.user.image}
              key={index}
            />
          ))
        ) : (
          <div>No videos</div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
