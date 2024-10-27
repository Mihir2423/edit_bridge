import { BreadCrumb } from "@/components/globals/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { assertAuthenticated } from "@/lib/session";
import { getVideoDetailUseCase } from "@/use-cases/video";
import {
  CheckCircle,
  Instagram,
  Music,
  Share2,
  XCircle,
  Youtube,
} from "lucide-react";
import { redirect } from "next/navigation";
import { StatusBtn } from "./_components/status-btn";
import { VideoPlayer } from "./_components/video-player";
import { TwitterLogoIcon } from "@radix-ui/react-icons";

export default async function VideoDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await assertAuthenticated();
  if (!session) redirect("/sign-in");
  const videoDetail = await getVideoDetailUseCase(params.slug);
  if (!videoDetail) redirect("/dashboard");

  const connectedPlatforms = ["youtube", "instagram"];

  const socialPlatforms = [
    {
      name: "YouTube",
      icon: Youtube,
      connected: connectedPlatforms.includes("youtube"),
    },
    {
      name: "Instagram",
      icon: Instagram,
      connected: connectedPlatforms.includes("instagram"),
    },
    {
      name: "X(Twitter)",
      icon: TwitterLogoIcon,
      connected: connectedPlatforms.includes("twitter"),
    },
    {
      name: "TikTok",
      icon: Music,
      connected: connectedPlatforms.includes("tiktok"),
    },
  ];

  return (
    <div className="mx-auto px-4 py-8 container">
      <BreadCrumb
        links={[{ name: "Home", path: "/dashboard" }]}
        page="Video Detail"
      />
      <div className="gap-8 grid grid-cols-1 lg:grid-cols-3 mt-8">
        <Card className="col-span-2 mx-auto">
          <CardHeader>
            <CardTitle className="font-bold text-2xl">Video Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <VideoPlayer
              title="Awesome Video Title"
              src={videoDetail!.video}
              thumbnail={videoDetail!.thumbnail}
            />
            <div>
              <h2 className="mb-2 font-semibold text-xl">
                {videoDetail?.title}
              </h2>
              <p className="text-muted-foreground">
                {videoDetail?.description}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            {session.userType === "creator" ? (
              videoDetail?.videoStatus === "pending" ? (
                <>
                  <StatusBtn
                    variant="outline"
                    status="rejected"
                    videoId={videoDetail?.id}
                    creatorId={videoDetail.user.id}
                  >
                    <XCircle className="mr-2 w-4 h-4" />
                    Reject
                  </StatusBtn>
                  <StatusBtn
                    status="approved"
                    videoId={videoDetail.id}
                    creatorId={videoDetail.user.id}
                  >
                    <CheckCircle className="mr-2 w-4 h-4" />
                    Accept
                  </StatusBtn>
                </>
              ) : videoDetail?.videoStatus === "rejected" ? (
                <Button variant="outline" className="w-28">
                  <XCircle className="mr-2 w-4 h-4" />
                  Rejected
                </Button>
              ) : (
                <Button variant="outline" className="w-32">
                  <CheckCircle className="mr-2 w-4 h-4" />
                  Approved
                </Button>
              )
            ) : (
              <Button variant="outline" className="w-28">
                <XCircle className="mr-2 w-4 h-4" />
                Delete
              </Button>
            )}
          </CardFooter>
        </Card>
        {session.userType === "creator" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Share2 className="mr-2 w-5 h-5" />
                Upload on Social Media
              </CardTitle>
            </CardHeader>
            <CardContent className="gap-4 grid">
              {socialPlatforms.map((platform) => (
                <Button
                  key={platform.name}
                  variant={
                    platform.connected && videoDetail.videoStatus === "approved"
                      ? "default"
                      : "outline"
                  }
                  className="justify-start w-full"
                  disabled={videoDetail.videoStatus !== "approved"}
                >
                  <platform.icon className="mr-2 w-5 h-5" />
                  {platform.connected
                    ? videoDetail.videoStatus === "approved"
                      ? `Share on ${platform.name}`
                      : "Pending Approval"
                    : `Connect ${platform.name}`}
                </Button>
              ))}
            </CardContent>
            <CardFooter>
              <p className="w-full text-center text-muted-foreground text-xs">
                Share your approved video across multiple platforms to maximize
                your reach.
              </p>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
