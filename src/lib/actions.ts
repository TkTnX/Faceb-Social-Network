"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "./client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

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
      const follower = await prisma.follower.findFirst({
        where: {
          OR: [
            { followerId: userId, followingId: currentUser },
            {
              followerId: currentUser,
              followingId: userId,
            },
          ],
        },
      });

      if (follower) {
        await prisma.follower.delete({
          where: {
            id: follower.id,
          },
        });
      }
    }

    revalidatePath(`/`);
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

export async function updateProfileInformation(
  formData: FormData,
  profileBg?: string
) {
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
    profileBg: z.string().optional(),
  });

  const validatedFields = Profile.safeParse({ ...filteredFields, profileBg });

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

export async function changeLike(postId: number) {
  const { userId: currentUser } = auth();
  if (!currentUser) return new Error("You are not authenticated");
  try {
    const isAlredyLiked = await prisma.like.findFirst({
      where: {
        userId: currentUser,
      },
    });

    if (isAlredyLiked) {
      await prisma.like.delete({
        where: {
          id: isAlredyLiked.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          userId: currentUser,
          postId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

export async function addComment(postId: number, content: string) {
  const { userId: currentUser } = auth();
  if (!currentUser) return new Error("You are not authenticated");
  try {
    const newComment = await prisma.comment.create({
      data: {
        userId: currentUser,
        postId,
        content,
      },
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
    });

    if (!newComment) {
      throw new Error("Can't add comment");
    }

    return newComment;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

export async function deleteComments(commentId: number, postId: number) {
  const { userId: currentUser } = auth();
  if (!currentUser) return new Error("You are not authenticated");
  try {
    await prisma.comment.delete({
      where: {
        id: commentId,
        userId: currentUser,
        postId,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

export async function addPost(formData: FormData, img: string) {
  const { userId: currentUser } = auth();
  if (!currentUser) return new Error("You are not authenticated");
  const desc = formData.get("desc") as string;
  const DescCheck = z.string().min(1).max(255);
  const validatedDesc = DescCheck.safeParse(desc);
  if (!validatedDesc.success) {
    console.log(validatedDesc.error.flatten().fieldErrors);
    throw new Error("Invalid description");
  }
  try {
    await prisma.post.create({
      data: {
        userId: currentUser,
        desc,
        img,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

export async function deletePost(postId: number) {
  const { userId: currentUser } = auth();
  if (!currentUser) return new Error("You are not authenticated");
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

export async function editPost(
  postId: number,
  formData: FormData,
  img: string | null
) {
  const { userId: currentUser } = auth();
  if (!currentUser) return new Error("You are not authenticated");
  const desc = formData.get("desc") as string;

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        desc: desc || post.desc,
        img: img || post.img,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

export async function addStory(img: string) {
  const { userId: currentUser } = auth();
  if (!currentUser) return new Error("You are not authenticated");
  try {
    const existingStory = await prisma.story.findFirst({
      where: {
        userId: currentUser,
      },
    });

    if (existingStory) {
      await prisma.story.delete({
        where: {
          id: existingStory.id,
        },
      });
    }

    const newStory = await prisma.story.create({
      data: {
        userId: currentUser,
        img,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
      include: {
        user: true,
      },
    });

    return newStory;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}
