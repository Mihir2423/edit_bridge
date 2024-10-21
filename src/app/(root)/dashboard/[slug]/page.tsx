import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { VideoPlayer } from "./_components/video-player";
import { BreadCrumb } from "@/components/globals/breadcrumb";
import { assertAuthenticated } from "@/lib/session";
import { redirect } from "next/navigation";
import { getVideoDetailUseCase } from "@/use-cases/video";

export default async function VideoDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await assertAuthenticated();
  if (!session) redirect("/sign-in");
  const videoDetail = await getVideoDetailUseCase(params.slug);
  return (
    <>
      <BreadCrumb
        links={[{ name: "Home", path: "/dashboard" }]}
        page="Video Detail"
      />
      <Card className="mx-auto max-w-2xl">
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
            <h2 className="mb-2 font-semibold text-xl">{videoDetail?.title}</h2>
            <p className="text-muted-foreground">{videoDetail?.description}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          {session.userType === "creator" ? (
            <>
              <Button variant="outline" className="w-28">
                <XCircle className="mr-2 w-4 h-4" />
                Reject
              </Button>
              <Button className="w-28">
                <CheckCircle className="mr-2 w-4 h-4" />
                Accept
              </Button>
            </>
          ) : (
            <Button variant="outline" className="w-28">
              <XCircle className="mr-2 w-4 h-4" />
              Delete
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
