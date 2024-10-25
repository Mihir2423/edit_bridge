"use client";

import { dynamicBlurDataUrl } from "@/lib/dynamic-blur";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type ErrorImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export const ErrorImage = ({
  src,
  alt,
  width,
  height,
  className,
}: ErrorImageProps) => {
  const [error, setError] = useState(false);
  const [blurDataUrl, setBlurDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const generateBlurDataUrl = async () => {
      try {
        const blurUrl = await dynamicBlurDataUrl(src);
        setBlurDataUrl(blurUrl);
      } catch (err) {
        console.error("Error generating blur data URL:", err);
      }
    };

    generateBlurDataUrl();
  }, [src]);

  // If blurDataUrl is not ready, avoid using placeholder="blur" or set a fallback blurDataURL
  return (
    <Image
      src={error ? "/images/error-image.avif" : src}
      alt={alt}
      placeholder={blurDataUrl ? "blur" : "empty"} // Only use blur if blurDataUrl is available
      blurDataURL={blurDataUrl || undefined} // Ensure this is not an empty string or null
      onError={() => setError(true)}
      width={width}
      height={height}
      className={className}
    />
  );
};
