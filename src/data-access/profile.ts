import "server-only"

import prisma from "@/lib/db";

export async function updateProfile(data: UserWithoutWorkIds) {
 
  const res = await prisma.user.update({
    where: { id: data.id },
    data: {
      name: data?.name,
      image: data?.image,
      city: data?.city,
      country: data?.country,
      bio: data?.bio,
      slug: data?.slug,
      socials: data?.socials,
      previousWork: {
        deleteMany: {},
        create:
          data?.previousWork?.map((work) => ({
            title: work.title,
            description: work.description,
            url: work.url,
            platform: work.platform || "Default",
          })) || [],
      },
    },
    include: {
      previousWork: true,
    },
  });

  return res;
}
