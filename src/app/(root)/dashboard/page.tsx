import { Button } from "@/components/ui/button";
import { VideoCard } from "./_components/video-card";
import { assertAuthenticated } from "@/lib/session";
import { Plus } from "lucide-react";
import Link from "next/link";

const DashboardPage = async () => {
  const currUser = await assertAuthenticated();

  return (
    <div className="relative text-black">
      <div className="top-28 left-0 z-[10] sticky flex justify-between items-center backdrop-blur-md mb-4 px-4 pb-2 border-b w-full">
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
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <VideoCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
