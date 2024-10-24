"use server";
import { prisma } from "@/lib/client";
import ChatsUsersList from "./ChatsUsersList";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ChatsSidebar = async ({ isSmall }: { isSmall: boolean }) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) redirect("/");
  const userChats = await prisma.userChats.findMany({
    where: {
      userId: currentUserId,
    },
    include: {
      chat: {
        select: {
          lastMessage: true,
          isSeen: true,
          userChats: {
            select: {
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
          },
        },
      },
      user: {
        select: {
          id: true,
          nickname: true,
          firstname: true,
          lastname: true,

          avatar: true,
          userChats: {
            select: {
              chatId: true,
            },
          },
        },
      },
    },
    orderBy: {
      chat: {
        updatedAt: "desc",
      },
    },
  });

  if (!userChats || (!userChats.length && !isSmall))
    return (
      <div>
        <p className="text-gray text-xs font-medium text-center">
          You do not have any chats yet
        </p>
        <Link
          className="text-main text-[8px] font-medium text-center block bg-main/10 p-2 rounded-lg mt-5"
          href="/friends"
        >
          You can find some friends here
        </Link>
      </div>
    );

  return (
    <div
      className={cn(
        "hidden sm:flex flex-col gap-2 border-r border-gray/20 pr-1 sm:pr-3 min-w-[20%] w-1/5",
        { "flex w-full sm:hidden": isSmall }
      )}
    >
      <ChatsUsersList size={isSmall ? "sm" : "lg"} userChats={userChats} />
    </div>
  );
};

export default ChatsSidebar;
