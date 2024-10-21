"use client";
import { Pen, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { deleteMessage, editMessage } from "@/lib/actions";
import { useState } from "react";

const ChatMessageMore = ({
  children,
  setIsEditing,
  isEditing,
  messageId,
  isImage,
}: {
  children: React.ReactNode;
  setIsEditing: (b: boolean) => void;
  isEditing: boolean;
  messageId: number;
  isImage: boolean;
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

  const editOpen = () => {
    setIsEditing(!isEditing);
    setOpen(false);
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
        {!isImage && (
          <button
            onClick={editOpen}
            className="flex items-center gap-2 p-2 text-right text-yellow-500 hover:bg-yellow-500/20 rounded-lg hover:text-yellow-500 duration-100"
          >
            Edit <Pen size={12} />
          </button>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatMessageMore;
