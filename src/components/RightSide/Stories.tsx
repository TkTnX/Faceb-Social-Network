"use server";
import { prisma } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import StoriesList from "./StoriesList";

const Stories = async ({isStoriesPage}: {isStoriesPage?: boolean}) => {
  const { userId: currentUser } = auth();
  if (!currentUser) return null;

  await prisma.story.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });

  const stories = await prisma.story.findMany({
    where: {
      OR: [
        {
          user: {
            following: {
              some: {
                followerId: currentUser,
              },
            },
          },
        },
        { userId: currentUser },
      ],
    },

    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });


  return (
    <div className="">
      <div className="flex items-center justify-between">
        {!isStoriesPage && (
          <h4 className="text-[#203758] text-lg font-medium">Stories</h4>
        )}
      </div>
      <StoriesList isStoriesPage={isStoriesPage} stories={stories} />
    </div>
  );
};

export default Stories;
