"use client";
import { Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { deleteMessage } from "@/lib/actions";
import { useState } from "react";

const ChatMessageMore = ({
  children,
  messageId,
}: {
  children: React.ReactNode;
  messageId: number;
}) => {
  const [open, setOpen] = useState(false);
  const deleteMessageFunc = async () => {
    try {
      await deleteMessage(messageId);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="p-3">
        <form action={deleteMessageFunc}>
          <button className="flex items-center gap-2 p-2 text-right text-red-500 hover:bg-red-500/20 rounded-lg hover:text-red-500 duration-100">
            Delete <Trash size={12} />
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatMessageMore;
