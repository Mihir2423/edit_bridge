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

export default function VideoDetailPage() {
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
            src="/demos/thumbnail.mp4"
            thumbnail="/demos/thumbnail.jpg"
          />
          <div>
            <h2 className="mb-2 font-semibold text-xl">Awesome Video Title</h2>
            <p className="text-muted-foreground">
              This is a brief description of the video. It provides context
              about the content and helps viewers decide if they want to watch
              it. The description can be a few sentences long to give a good
              overview.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button variant="outline" className="w-28">
            <XCircle className="mr-2 w-4 h-4" />
            Reject
          </Button>
          <Button className="w-28">
            <CheckCircle className="mr-2 w-4 h-4" />
            Accept
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
