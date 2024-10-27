import "server-only";

import prisma from "@/lib/db";
import { generateVideoSlug } from "./utils";

export const createVideo = async ({
  payload,
  userId,
}: {
  payload: Video;
  userId: string;
}) => {
  const videoSlug = await generateVideoSlug(payload.title);
  await prisma.video.create({
    data: {
      title: payload.title,
      video: payload.video,
      slug: videoSlug,
      description: payload.description,
      thumbnail: payload.thumbnail,
      user: {
        connect: {
          id: userId,
        },
      },

      createdForUser: {
        connect: {
          id: payload.createdForId,
        },
      },
    },
  });
};

export const getMyVideos = async ({
  userType,
  userId,
}: {
  userType: string;
  userId: string;
}) => {
  let key = userType === "editor" ? "createdVideos" : "videosCreatedFor";
  const video = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      [key]: {
        select: {
          id: true,
          title: true,
          video: true,
          slug: true,
          description: true,
          thumbnail: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
          createdForUser: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
    },
  });
  return userType === "editor" ? video?.createdVideos : video?.videosCreatedFor;
};

export const getVideoDetail = async (slug: string) => {
  return prisma.video.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      title: true,
      video: true,
      slug: true,
      createdAt: true,
      description: true,
      thumbnail: true,
      videoStatus: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      createdForUser: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });
};

export const updateVideoStatus = async ({
  videoId,
  status,
}: {
  videoId: string;
  status: string;
}) => {
  await prisma.video.update({
    where: {
      id: videoId,
    },
    data: {
      videoStatus: status,
    },
  });
};
