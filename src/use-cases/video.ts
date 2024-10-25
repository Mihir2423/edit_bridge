import "server-only";

import { AuthenticationError } from "./errors";
import { createVideo, getMyVideos, getVideoDetail } from "@/data-access/video";
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
}
