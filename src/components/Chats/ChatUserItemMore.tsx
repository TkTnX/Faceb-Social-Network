"use client";
import { Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { deleteChat } from "@/lib/actions";
import { redirect } from "next/navigation";

const ChatUserItemMore = ({
  children,
  userId,
  chatId,
}: {
  children: React.ReactNode;
  userId: string;
  chatId?: number;
}) => {
  const [open, setOpen] = useState(false);
  const deleteChatFunc = async () => {
    if (!chatId) return;
    try {
      await deleteChat(chatId, userId);
      redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="p-3">
        <form action={deleteChatFunc}>
          <button className="flex items-center gap-2 p-2 text-right text-red-500 hover:bg-red-500/20 rounded-lg hover:text-red-500 duration-100">
            Delete <Trash size={12} />
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatUserItemMore;
