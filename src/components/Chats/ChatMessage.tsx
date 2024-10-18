"use client";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";

const ChatMessage = ({ message }: any) => {
  const { userId } = useAuth();

  return (
    <div
      className={cn("max-w-[60%] text-xs p-5 bg-main/10 rounded-lg", {
        "ml-auto bg-main/40": message.receiverId === userId,
      })}
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit nisi,
        eligendi neque explicabo odio quod omnis dolorem. Vitae voluptatibus at
        tenetur porro ea voluptates fuga et provident, illum ratione soluta!
      </p>
    </div>
  );
};

export default ChatMessage;
