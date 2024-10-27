import "server-only";

import { AuthenticationError } from "./errors";
import { createVideo, getMyVideos, getVideoDetail, updateVideoStatus } from "@/data-access/video";
export const createVideoUseCase = async ({
  input,
  userId,
}: {
  input: Video;
  userId: string;
}) => {
  if (!userId) {
    throw new AuthenticationError();
  }
  const payload = {
    title: input.title,
    video: input.video,
    description: input.description,
    thumbnail: input.thumbnail,
    createdForId: input.createdForId,
    userId,
  };
  await createVideo({ payload, userId });
};

export const getMyVideosUseCase = async ({
  userType,
  userId,
}: {
  userType: string;
  userId: string;
}) => {
  if (!userId) {
    throw new AuthenticationError();
  }
  return getMyVideos({ userType, userId });
};

export const getVideoDetailUseCase = async (slug: string) => {
  return getVideoDetail(slug);
};

export const updateVideoStatusUseCase = async ({
  userType,
  videoId,
  userId,
  creatorId,
  status
}: {
  userType: string;
  videoId: string;
  userId: string;
  creatorId: string;
  status: string;
}) => {
  if (userId === creatorId) {
    throw new Error("You can't update status for your own video");
  }
  if (!userId) {
    throw new AuthenticationError();
  }
  if (userType !== "creator") {
    throw new Error("You don't have permission to update status");
  }
  await updateVideoStatus({ videoId, status });
};
