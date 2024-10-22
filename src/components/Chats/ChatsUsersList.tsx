"use client";
import { ChatsUserItem } from "@/components/Chats";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { useState } from "react";
import { UserChats } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";

export type ChatsUsersListProps = {
  id: string;
  nickname: string;
  firstname: string;
  lastname: string;
  avatar: string | null;
  userChats: { chatId: number }[];
};

type UserChatsWithUser = UserChats & {
  chat: {
    lastMessage: string;
    isSeen: boolean;
    userChats: {
      user: {
        id: string;
        nickname: string;
        firstname: string;
        avatar: string | null;
        lastname: string;
      };
    }[];
  } | null;
  user: {
    id: string;
    avatar: string | null;
    nickname: string;
    firstname: string;
    lastname: string;
    userChats: {
      chatId: number;
    }[];
  };
};

const ChatsUsersList = ({
  size,
  userChats,
}: {
  size: "sm" | "lg";
  userChats: UserChatsWithUser[];
}) => {
  const [value, setValue] = useState("");
  const { userId } = useAuth();


  const filteredUsersWithSearch = userChats
    .map((user) => user)
    .filter((user) => {
      return (
        user.user.nickname.toLowerCase().includes(value.toLowerCase()) ||
        user.user.firstname.toLowerCase().includes(value.toLowerCase()) ||
        user.user.lastname.toLowerCase().includes(value.toLowerCase())
      );
    });

  if(!filteredUsersWithSearch || filteredUsersWithSearch.length === 0) return null



  return (
    <div className="flex flex-col gap-3 pt-2">
      {size === "lg" && (
        <h3 className="text-center sm:text-left font-bold text-xl">Chats</h3>
      )}

      {size !== "sm" && (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Find chats"
        />
      )}

      <div
        className={cn("", {
          "flex w-full gap-3 overflow-x-auto scrollbar": size === "sm",
        })}
      >
        {filteredUsersWithSearch.length > 0 ? (
          filteredUsersWithSearch.map((user) => (
            <ChatsUserItem
              isInSidebar={true}
              key={user && user.id}
              user={
                user.chat?.userChats.find(u => u.user.id !== userId)?.user || null
              }
              lastMessage={user.chat?.lastMessage || null}
              chatId={user && user.chatId}
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
