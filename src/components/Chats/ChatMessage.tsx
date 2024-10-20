"use client";
import { createdAt } from "@/lib/createdAt";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Message } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import ChatMessageMore from "./ChatMessageMore";

const ChatMessage = ({ message }: { message: Message }) => {
  const { userId } = useAuth();
  const messageCreatedAt = createdAt(message.createdAt);

  return (
    <div
      className={cn("max-w-max mr-auto relative", {
        "ml-auto  mr-0": message.senderId === userId,
      })}
    >
      <div
        className={cn(" text-xs p-5 bg-main/10 rounded-lg group", {
          " bg-main/40 mr-0": message.senderId === userId,
        })}
      >
        <p>{message.content}</p>
        {message.senderId === userId && (
          <ChatMessageMore messageId={message.id}>
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 duration-150">
              <MoreHorizontal size={16} />
            </button>
          </ChatMessageMore>
        )}
      </div>
      <span className="text-[9px] text-gray">{messageCreatedAt}</span>
    </div>
  );
};

export default ChatMessage;
