"use server";
import { prisma } from "@/lib/client";
import ChatsUsersList from "./ChatsUsersList";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ChatsSidebar = async () => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) redirect("/");
  const userChats = await prisma.userChats.findMany({
    where: {
      userId: currentUserId,
    },
    include: {
      chat: {
        select: {
          userChats: {
            select: {
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
          },
        },
      },
    },
  });

  if (!userChats || !userChats.length)
    return <p>You do not have any chats yet</p>;
  const filteredUserChats = userChats
    .map(
      (c) =>
        c.chat?.userChats
          .filter((u) => u.user.id !== currentUserId)
          .map((u) => u.user) ?? []
    )
    .filter((chat) => chat !== undefined && chat.length > 0)
    .flatMap((chat) => chat);

  return (
    <div className="hidden sm:flex flex-col gap-2 border-r border-gray/20 pr-1 sm:pr-3 min-w-[20%] w-1/5">
      <ChatsUsersList filteredUserChats={filteredUserChats} size="lg" />
    </div>
  );
};

export default ChatsSidebar;
