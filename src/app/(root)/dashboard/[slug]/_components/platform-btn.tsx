"use client";

import { Button } from "@/components/ui/button";
import { Instagram, Music, Youtube } from "lucide-react";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { useSession, signIn as nextAuthSignIn } from "next-auth/react";
import { useState } from "react";

type Platform = {
  name: string;
  iconType: string;
  connected: boolean;
};

type Props = {
  platform: Platform;
  videoStatus: string;
  slug: string;
};

export const PlatformBtn = ({ platform, videoStatus, slug }: Props) => {
  const { data: session, update: updateSession } = useSession();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectYouTube = async () => {
    setIsConnecting(true);
    try {
      const result = await nextAuthSignIn("youtube", {
        redirect: false,
        callbackUrl: `/dashboard/${slug}`,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Update the session to reflect the new connection
      await updateSession();

      toast.success("Connected YouTube");
    } catch (error) {
      console.error("Error connecting YouTube:", error);
      toast.error("Error connecting YouTube");
    } finally {
      setIsConnecting(false);
    }
  };
  const isYouTubeConnected = !!session?.user?.youtube_access_token;

  const handleClick = (platformName: string) => {
    if (platformName.toLowerCase() === "youtube") {
      // Check if YouTube is already connected
      if (isYouTubeConnected) {
        toast("YouTube already connected");
        // Upload to youtube
      } else {
        handleConnectYouTube();
      }
    }
  };

  const getIcon = (iconType: string) => {
    switch (iconType.toLowerCase()) {
      case "youtube":
        return <Youtube className="mr-2 w-5 h-5" />;
      case "instagram":
        return <Instagram className="mr-2 w-5 h-5" />;
      case "twitter":
        return <TwitterLogoIcon className="mr-2 w-5 h-5" />;
      case "tiktok":
        return <Music className="mr-2 w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <Button
      key={platform.name}
      variant={
        platform.connected && videoStatus === "approved" ? "default" : "outline"
      }
      className="justify-start w-full"
      onClick={() => handleClick(platform.name)}
      disabled={videoStatus !== "approved" || isConnecting}
    >
      {getIcon(platform.iconType)}
      {isConnecting
        ? "Connecting..."
        : platform.connected
          ? videoStatus === "approved"
            ? `Share on ${platform.name}`
            : "Pending Approval"
          : `Connect ${platform.name}`}
    </Button>
  );
};
