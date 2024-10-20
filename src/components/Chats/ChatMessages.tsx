"use client";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "@/components/Chats";
import { Message } from "@prisma/client";
import { supabase } from "@/lib/supabase";

const ChatMessages = ({ messages }: { messages: Message[] }) => {
  const endMessages = useRef(null);
  const [liveMessages, setLiveMessages] = useState<Message[]>(messages); // Используем начальные сообщения
  // Скролл до конца при добавлении новых сообщений
  useEffect(() => {
    if (endMessages.current) {
      // @ts-ignore
      endMessages.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [liveMessages]);

  useEffect(() => {
    const handleInserts = (payload: any) => {
      setLiveMessages((prevMessages) => [...prevMessages, payload.new]);
    };

    const channel = supabase
      .channel("Message")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Message",
        },
        handleInserts
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
