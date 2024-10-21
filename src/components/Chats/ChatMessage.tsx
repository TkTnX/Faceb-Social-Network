"use client";
import { createdAt } from "@/lib/createdAt";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Message } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import ChatMessageMore from "./ChatMessageMore";
import { useState } from "react";
import { editMessage } from "@/lib/actions";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const ChatMessage = ({ message }: { message: Message }) => {
  const { userId } = useAuth();
  const messageCreatedAt = createdAt(message.createdAt);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(message.content);

  const editMessageFunc = async () => {
    try {
      await editMessage(content, message.id);

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

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
        {isEditing ? (
          <form className="flex items-center gap-2" action={editMessageFunc}>
            <Input
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              type="text"
            />
            <Button type="submit" className="bg-main hover:bg-main/80">
              Edit
            </Button>
          </form>
        ) : (
          <p>{message.content}</p>
        )}

        {message.senderId === userId && (
          <ChatMessageMore
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            messageId={message.id}
          >
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 duration-150">
              <MoreHorizontal size={16} />
            </button>
          </ChatMessageMore>
        )}
        {message.createdAt.toString() !== message.updatedAt.toString() && (
          <span className="text-[9px] text-gray">Edited</span>
        )}
      </div>
      {message.createdAt.toString() === message.updatedAt.toString() && (
        <span className="text-[9px] text-gray">{messageCreatedAt}</span>
      )}
    </div>
  );
};

export default ChatMessage;
