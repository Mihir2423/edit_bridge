import prisma from "@/lib/db";

export async function updateProfile(data: User) {
  const res = await prisma.user.update({
    where: { id: data.id },
    data: {
      name: data?.name,
      image: data?.image,
      city: data?.city,
      country: data?.country,
      bio: data?.bio,
      socials: data?.socials,
      previousWork: {
        deleteMany: {},
        create:
          data?.previousWorks?.map((work) => ({
            title: work.title,
            description: work.description,
            url: work.link,
            platform: "default",
          })) || [],
      },
    },
    include: {
      previousWork: true,
    },
  });

  return res;
}
