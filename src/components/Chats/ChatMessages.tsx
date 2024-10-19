"use client";
import { useEffect, useRef } from "react";
import { ChatMessage } from "@/components/Chats";
import { Message } from "@prisma/client";

const ChatMessages = ({ messages }: { messages: Message[] }) => {
  const endMessages = useRef(null);

  useEffect(() => {
    if (endMessages.current) {
      console.log(endMessages.current);
      // @ts-ignore
      endMessages.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="flex-1 h-full w-full overflow-y-auto scrollbar">
      {messages.length > 0 ? (
        <div className="grid gap-2 p-5">
          {messages.map((message) => (
            <ChatMessage key={message.createdAt.toString()} message={message} />
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
