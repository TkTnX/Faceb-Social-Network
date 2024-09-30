"use server";
import Post, { FeedPostType } from "./Post";
import { prisma } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";

const Feed = async ({ userId, type }: { userId?: string; type: string }) => {
  let posts: FeedPostType[] = [];
  const { userId: currentUser } = auth();

  if (userId) {
    posts = await prisma.post.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
  }
  if (userId && type === "home") {
    if (!currentUser) return null;
    const user = await prisma.user.findFirst({
      where: {
        id: currentUser,
      },
      include: {
        following: {
          select: {
            followerId: true,
          },
        },
      },
    });


    if (!user) return null;

    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: user.following.map((user) => String(user.followerId)),
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
  }

  return (
    <div className="grid gap-3 mt-3">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post.id} post={post} currentUser={currentUser || ""} />
        ))
      ) : (
        <span className="text-center text-gray block mt-5">No posts yet</span>
      )}
    </div>
  );
};

export default Feed;
