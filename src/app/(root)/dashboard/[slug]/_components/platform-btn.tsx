"use client";

import { Button } from "@/components/ui/button";
import { Instagram, Music, Youtube } from "lucide-react";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { useSession, signIn as nextAuthSignIn } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

type Platform = {
  name: string;
  iconType: string;
  connected: boolean;
};

type Props = {
  platform: Platform;
  videoStatus: string;
  slug: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
};

export const PlatformBtn = ({
  platform,
  videoStatus,
  slug,
  title,
  description,
  videoUrl,
  thumbnailUrl,
}: Props) => {
  const { data: session, update: updateSession } = useSession();
  const [isConnecting, setIsConnecting] = useState(false);
  const isYouTubeConnected = !!session?.user?.youtube_access_token;
  const handleUpload = async () => {
    // Upload to YouTube
    setIsConnecting(true);
    try {
      const secret = process.env.NEXT_PUBLIC_YOUTUBE_SECRET;
      if (!secret || !session?.user?.youtube_access_token) {
        throw new Error("Something went wrong");
      }
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${session?.user?.youtube_access_token}`
      );
      console.log(response.data, "SESSIONDATA");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/upload-video`,
        {
          accessToken: session?.user?.youtube_access_token,
          title,
          description,
          videoUrl,
          thumbnailUrl,
        }
      );
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      toast.success("Video uploaded to YouTube");
    } catch (error) {
      console.error("Error uploading to YouTube:", error);
      toast.error("Error uploading to YouTube");
    } finally {
      setIsConnecting(false);
    }
  };

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

  const handleClick = (platformName: string) => {
    if (platformName.toLowerCase() === "youtube") {
      // Check if YouTube is already connected
      if (isYouTubeConnected) {
        // Upload to youtube
        toast("Uploading to youtube...");
        handleUpload();
      } else {
        // Connect to YouTube
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
