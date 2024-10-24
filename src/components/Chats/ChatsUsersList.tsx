"use client";
import { ChatsUserItem } from "@/components/Chats";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { UserChats } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";

export type ChatsUsersListProps = {
  id: string;
  nickname: string;
  firstname: string;
  lastname: string;
  avatar: string | null;
  userChats: { chatId: number }[];
};

export type UserChatsWithUser = UserChats & {
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
  const { userId } = useAuth();
  const [value, setValue] = useState("");
  const [liveUserChats, setLiveUserChats] =
    useState<UserChatsWithUser[]>(userChats);

  useEffect(() => {
    const handleInserts = (payload: any) => {
      // @ts-ignore

      setLiveUserChats((prevUserChats) => {
        return prevUserChats.map((userChat) => {
          if (userChat.chatId === payload.new.id) {
            return {
              ...userChat,
              chat: {
                ...userChat.chat,
                lastMessage: payload.new.lastMessage,
              },
            };
          }
          return userChat;
        });
      });
    };

    const handleDelete = (payload: any) => {
      // @ts-ignore

      setLiveUserChats((prevUserChats) => {
        return prevUserChats.map((userChat) => {
          if (userChat.chatId === payload.new.id) {
            return {
              ...userChat,
              chat: {
                ...userChat.chat,
                lastMessage: payload.new.lastMessage,
              },
            };
          }
          return userChat;
        });
      });
    };

   const handleEdit = (payload: any) => {

     // @ts-ignore
    setLiveUserChats((prevUserChats) => {
      return prevUserChats.map((userChat) => {
        if (userChat.chatId === payload.new.id) {
          return {
            ...userChat,
            chat: {
              ...userChat.chat,
              lastMessage: payload.new.lastMessage,
            },
          };
        }
        return userChat;
      });
    });
   };

    const channel = supabase
      .channel("Chat")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Chat",
        },
        handleInserts
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "Chat",
        },
        handleDelete
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Chat",
        },
        handleEdit
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredUsersWithSearch = liveUserChats.filter((chat) => {
    const otherUser =
      chat.chat?.userChats?.find((userChat) => userChat.user.id !== userId)
        ?.user || null;

    if (!otherUser) return false;
    return (
      otherUser.nickname.toLowerCase().includes(value.toLowerCase()) ||
      otherUser.firstname.toLowerCase().includes(value.toLowerCase()) ||
      otherUser.lastname.toLowerCase().includes(value.toLowerCase())
    );
  });

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
          filteredUsersWithSearch.map((chat) => {
            return (
              <ChatsUserItem
                isInSidebar={true}
                key={chat.chatId}
                user={
                  chat.chat?.userChats?.find(
                    (userChat) => userChat.user.id !== userId
                  )?.user || null
                }
                lastMessage={chat.chat?.lastMessage || null}
                chatId={chat && chat.chatId}
              />
            );
          })
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
