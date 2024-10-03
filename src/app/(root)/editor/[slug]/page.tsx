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
import { getUserBySlugUseCase } from "@/use-cases/editor";
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { CheckCircle, ExternalLink, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HireBtn } from "../_components/hire-btn";
import { isInRequestList } from "@/lib/utils";

type Props = {
  params: {
    slug: string;
  };
};

const EditorDetailPage = async ({ params }: Props) => {
  if (!params.slug || params.slug === "" || params.slug === "null") {
    return (
      <Card className="mx-auto my-20 p-10 w-[400px]">
        <p className="font-xs text-gray-400">Error</p>
        <h1 className="font-semibold text-xl">
          {" User hasn't completed his profile."}
        </h1>
        <Button asChild className="mt-4">
          <Link href="/editor">Go Back</Link>
        </Button>
      </Card>
    );
  }
  const session = await assertAuthenticated();
  const user = await getUserBySlugUseCase(session, params.slug);

  if (!user) {
    return (
      <Card className="mx-auto my-20 p-10 w-[400px]">
        <p className="font-xs text-gray-400">Error</p>
        <h1 className="font-semibold text-xl">{"User not found."}</h1>
        <Button asChild className="mt-4">
          <Link href="/editor">Go Back</Link>
        </Button>
      </Card>
    );
  }
  return (
    <>
      <BreadCrumb
        links={[{ name: "Editor's Page", path: "/editor" }]}
        page="Details"
      />
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">
            {user?.name ?? "Editor Name"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h2 className="mb-2 font-semibold text-xl">About:</h2>
            <p className="text-muted-foreground">
              {user?.bio ?? "About Editor is not filled yet."}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-xl">Previous Works:</h2>
            {(user?.previousWork ?? []).length === 0 ? (
              <div>
                <p className="text-muted-foreground">
                  No previous works found.
                </p>
              </div>
            ) : (
              (user?.previousWork ?? []).map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 border-gray-400 p-4 border rounded-md w-full"
                >
                  <Image
                    alt={item.platform ?? "Platform"}
                    src={`/images/${item.platform ? item.platform : "Default"}.jpg`}
                    width={150}
                    height={150}
                    style={{ height: "150px", objectFit: "cover" }}
                    className="rounded-md"
                  />
                  <div className="flex flex-col gap-2">
                    <h1 className="font-semibold text-xl">
                      {item.title ?? "Title"}
                    </h1>
                    <p className="text-sm">
                      {item.description ?? "Description not available."}
                    </p>
                    <Link href={item.url ?? "#"}>
                      <ExternalLink size={16} />
                    </Link>
                  </div>
                </div>
              ))
            )}
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
          <div className="w-fit">
            {!isInRequestList(session?.id, user?.request_received, user?.request_send) && (
              <HireBtn editorId={user?.id} />
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default EditorDetailPage;
