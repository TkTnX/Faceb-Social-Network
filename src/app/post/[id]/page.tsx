import { Post } from "@/components";
import { prisma } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

const PostPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const { userId: currentUser } = auth();

  if(!currentUser) return notFound();

  const post = await prisma.post.findFirst({
    where: {
      id: Number(id),
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
  });

  if (!post) return notFound();

  return (
    <div className=" max-w-[1317px] px-4 mx-auto">
      <Post isPostPage={true} post={post}  />
    </div>
  );
};

export default PostPage;
