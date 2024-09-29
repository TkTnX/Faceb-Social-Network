"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "./client";
import { z } from "zod";

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

export async function updateProfileInformation(formData: FormData) {
  const { userId: currentUser } = auth();
  if (!currentUser) return new Error("You are not authenticated");
  const fields = Object.fromEntries(formData);

  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );

  const Profile = z.object({
    firstname: z.string().max(20).optional(),
    lastname: z.string().max(40).optional(),
    description: z.string().max(255).optional(),
    city: z.string().optional(),
    school: z.string().optional(),
    work: z.string().optional(),
    website: z.string().optional(),
  });

  const validatedFields = Profile.safeParse(filteredFields);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
  }

  try {
    await prisma.user.update({
      where: {
        id: currentUser,
      },
      data: validatedFields.data ?? {},
    });

    const user = await prisma.user.findFirst({
      where: {
        id: currentUser,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}
