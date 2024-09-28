import { BreadCrumb } from "@/components/globals/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { CheckCircle, ExternalLink, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: {
    slug: string;
  };
};

const EditorDetailPage = ({ params }: Props) => {
  console.log(params.slug);

  return (
    <>
      <BreadCrumb
        links={[{ name: "Editor's Page", path: "/editor" }]}
        page="Details"
      />
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">Editor Name</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h2 className="mb-2 font-semibold text-xl">About:</h2>
            <p className="text-muted-foreground">
              This is a brief description of the video. It provides context
              about the content and helps viewers decide if they want to watch
              it. The description can be a few sentences long to give a good
              overview.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-xl">Previous Works:</h2>
            {[1, 2].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 border-gray-400 p-4 border rounded-md w-full"
              >
                <Image
                  alt="Youtube"
                  src="/demos/thumbnail.jpg"
                  width={150}
                  height={150}
                  className="rounded-md"
                />
                <div className="flex flex-col gap-2">
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sapiente quam voluptates, et necessitatibus, qui harum, non
                    mollitia ab commodi dolorum quis cupiditate dolores.
                  </p>
                  <Link href="https://google.com">
                    <ExternalLink size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between space-x-4">
          <div className="flex items-center gap-2">
            <Button>
              <InstagramLogoIcon />
            </Button>
            <Button>
              <TwitterLogoIcon />
            </Button>
            <Button>
              <Mail size={16} />
            </Button>
          </div>
          <Button className="w-28">
            <CheckCircle className="mr-2 w-4 h-4" />
            Hire
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default EditorDetailPage;
