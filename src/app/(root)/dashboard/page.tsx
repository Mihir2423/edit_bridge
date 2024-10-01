import { VideoCard } from "./_components/video-card";

const DashboardPage = () => {
  return (
    <div className="text-black">
      <div className="gap-6 grid grid-cols-4">
        <VideoCard />
      </div>
    </div>
  );
};

export default DashboardPage;
