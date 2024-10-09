import { FeedPostType } from "@/components/CenterSide/Post";
import { prisma } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { userId: currentUser } = auth();
  const { userId, type, skip, isUserBlocked, isCurrentUserBlocked } =
    Object.fromEntries(req.nextUrl.searchParams);
  try {
    let posts: FeedPostType[] = [];
    if (
      
      type === "profile"
    ) {
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
              likes: {
                select: {
                  userId: true,
                  id: true,
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

      const userFollowingsIds = [
        user.id,
        ...userFollowings.map((user) => user.followingId),
      ];
      posts = await prisma.post.findMany({
        where: {
          userId: {
            in: userFollowingsIds.map((id) => String(id)),
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
                },
              },
              likes: {
                select: {
                  userId: true,
                  id: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
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
        take: 5,
        skip: Number(skip),
      });
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    NextResponse.json({ message: "Can't fetch posts" }, { status: 500 });
  }
}
