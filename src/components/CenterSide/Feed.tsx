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
        comments: {
          include: {
            user: {
              select: {
                id: true,
                nickname: true,
                firstname: true,
                lastname: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
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
            followingId: true,
          },
        },
      },
    });

    if (!user) return null;
    const userFollowings = await prisma.follower.findMany({
      where: {
        followerId: user.id,
      },
    });

    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: userFollowings.map((user) => String(user.followingId)),
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                nickname: true,
                firstname: true,
                lastname: true,
                avatar: true,
              }
            },
          },
          orderBy: {
            createdAt: "desc",
          }
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
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
