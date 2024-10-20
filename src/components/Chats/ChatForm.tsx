"use client";
import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { addMessage } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import ChatFormButton from "./ChatFormButton";

const ChatForm = ({ chatId }: { chatId: number }) => {
  const [value, setValue] = useState("");
  const { userId } = useAuth();
  if (!userId) return null;
  const handleSend = async () => {
    const newMessage = await addMessage(value, chatId, userId);

    setValue("");
  };

  return (
    <form action={handleSend} className="p-3 flex items-center gap-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Message..."
      />
      <ChatFormButton value={value} />
    </form>
  );
};

export default ChatForm;
