"use client";

import { Button } from "@/components/ui/button";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
 defaultLayoutIcons,
 DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import Image from "next/image";
import React from "react";

type TitleProps = {
  title: string;
  src: string;
  thumbnail: string;
};

export const VideoPlayer = ({ title, src, thumbnail }: TitleProps) => {
  const [showVideo, setShowVideo] = React.useState(false);
  return (
    <div className="col-span-1">
      {showVideo ? (
        <MediaPlayer
          autoPlay={showVideo}
          title={title}
          src={src}
          className="w-full h-[400px]"
        >
          <MediaProvider />
          <DefaultVideoLayout
            thumbnails={thumbnail}
            icons={defaultLayoutIcons}
          />
        </MediaPlayer>
      ) : (
        <div className="relative rounded-lg overflow-hidden aspect-video">
          <Image
            src={thumbnail}
            alt={`Thumbnail for ${title}`}
            width={600}
            height={400}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex justify-center items-center">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full w-16 h-16"
              onClick={() => setShowVideo(true)}
            >
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
