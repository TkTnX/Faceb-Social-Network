"use client";
import { createdAt } from "@/lib/createdAt";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Message } from "@prisma/client";

const ChatMessage = ({ message }: { message: Message }) => {
  const { userId } = useAuth();
  const messageCreatedAt = createdAt(message.createdAt);

  return (
    <div
      className={cn("max-w-max mr-auto", {
        "ml-auto  mr-0": message.senderId === userId,
      })}
    >
      <div
        className={cn(" text-xs p-5 bg-main/10 rounded-lg ", {
          " bg-main/40 mr-0": message.senderId === userId,
        })}
      >
        <p>{message.content}</p>
      </div>
      <span className="text-[9px] text-gray">{messageCreatedAt}</span>
    </div>
  );
};

export default ChatMessage;
