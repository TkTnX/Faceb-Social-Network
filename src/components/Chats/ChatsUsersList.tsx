"use server";
import { prisma } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ChatsUserItem } from "@/components/Chats";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

const ChatsUsersList = async ({ size }: { size: "sm" | "lg" }) => {
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
    .map((c) =>
      c.chat?.userChats
        .filter((u) => u.user.id !== currentUserId)
        .map((u) => u.user)
    )
    .filter((chat) => chat !== undefined && chat.length > 0);

  return (
    <div className="flex flex-col gap-3 pt-2">
      {size === "lg" && (
        <h3 className="text-center sm:text-left font-bold text-xl">Chats</h3>
      )}

      <Input placeholder="Find chats" />

      <div
        className={cn("", {
          "flex w-full gap-3 overflow-x-auto scrollbar": size === "sm",
        })}
      >
        {filteredUserChats.length > 0 ? (
          filteredUserChats.map((chat) => (
            <ChatsUserItem
              isInSidebar={true}
              key={chat && chat[0].id}
              user={chat ? chat[0] : null}
              chatId={chat && chat[0].userChats[0].chatId}
            />
          ))
        ) : (
          <span className="text-gray text-xs font-medium">
            You do not have any chats yet
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatsUsersList;
