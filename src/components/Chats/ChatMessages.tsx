"use client";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "@/components/Chats";
import { Message } from "@prisma/client";
import { supabase } from "@/lib/supabase";
import { createdAt } from "@/lib/createdAt";

const ChatMessages = ({ messages }: { messages: Message[] }) => {
  const endMessages = useRef(null);
  const [liveMessages, setLiveMessages] = useState<Message[]>(messages);
  useEffect(() => {
    if (endMessages.current) {
      // @ts-ignore
      endMessages.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [liveMessages]);

  useEffect(() => {
    const handleInserts = (payload: any) => {
      setLiveMessages((prevMessages) => [
        ...prevMessages,
        { ...payload.new, createdAt: new Date(), updatedAt: new Date() },
      ]);
    };

    const handleDelete = (payload: any) => {
      setLiveMessages((prevMessages) => {
        return prevMessages.filter((message) => message.id !== payload.old.id);
      });
    };

    const handleEdit = (payload: any) => {
      setLiveMessages((prevMessages) => {
        return prevMessages.map((message) => {
          if (message.id === payload.new.id) {
            return {
              ...payload.new,
              updatedAt: new Date(),
            };
          }
          return message;
        });
      });
    };

    const channel = supabase
      .channel("Message")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Message",
        },
        handleInserts
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "Message",
        },
        handleDelete
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Message",
        },
        handleEdit
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex-1 h-full w-full overflow-y-auto scrollbar">
      {liveMessages.length > 0 ? (
        <div className="grid gap-2 p-5">
          {liveMessages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={endMessages} />
        </div>
      ) : (
        <span className="text-center text-gray h-full flex items-center justify-center">
          No messages yet
        </span>
      )}
    </div>
  );
};

export default ChatMessages;
