"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "./client";

export async function switchFollow(userId: string) {
  const { userId: currentUser } = auth();

  if (!currentUser) return new Error("You are not authenticated");
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) throw new Error("User not found");

    const isFollower = await prisma.follower.findFirst({
      where: {
        followerId: currentUser,
        followingId: userId,
      },
    });

    if (isFollower) {
      await prisma.follower.delete({
        where: {
          id: isFollower.id,
        },
      });
    } else {
      const isFollowing = await prisma.followRequest.findFirst({
        where: {
          receiverId: userId,
          senderId: currentUser,
        },
      });

      if (isFollowing) {
        await prisma.followRequest.delete({
          where: {
            id: isFollowing.id,
          },
        });
      } else {
        await prisma.followRequest.create({
          data: {
            receiverId: userId,
            senderId: currentUser,
          },
        });
      }
    }

    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

export async function switchBlock(userId: string) {
  const { userId: currentUser } = auth();

  if (!currentUser) return new Error("You are not authenticated");
  try {
    const isBlocked = await prisma.block.findFirst({
      where: {
        blockerId: currentUser,
        blockedId: userId,
      },
    });

    if (isBlocked) {
      await prisma.block.delete({
        where: {
          id: isBlocked.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUser,
          blockedId: userId,
        },
      });
    }

    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}
