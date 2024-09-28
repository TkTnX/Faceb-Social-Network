"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "./client";

export async function switchFollow(userId: string) {
  const { userId: currentUser } = auth();
  if (!currentUser) return new Error("You are not authenticated");
  try {
    // Проверка, подписан ли пользователь
    const isAlreadyFollower = await prisma.follower.findFirst({
      where: {
        followerId: currentUser,
        followingId: userId,
      },
    });

    // Если да - удаляем
    if (isAlreadyFollower) {
      await prisma.follower.delete({
        where: {
          id: isAlreadyFollower.id,
        },
      });
    } else {
      await prisma.follower.create({
        data: {
          followerId: currentUser,
          followingId: userId,
        },
      });
    }
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

export async function declineFollowRequest(userId: string) {
  const { userId: currentUser } = auth();

  if (!currentUser) return new Error("You are not authenticated");
  try {
    const follower = await prisma.follower.findFirst({
      where: {
        followerId: userId,
        followingId: currentUser,
      },
    });

    if (follower) {
      await prisma.follower.delete({
        where: {
          id: follower.id,
        },
      });
    } else {
      throw new Error("Follow request not found");
    }

    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}
