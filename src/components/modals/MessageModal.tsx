"use client";
import Image from "next/image";
import { StoriesWithUser } from "../RightSide/StoriesList";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { createdAt } from "@/lib/createdAt";
import { Message } from "@prisma/client";

const MessageModal = ({
  message,
  children,
}: {
  message: Message;
  children: React.ReactNode;
}) => {
  const storyCreatedAt = createdAt(message.createdAt);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>

        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <Image
          src={message.content}
          alt="message"
          width={500}
          height={410}
          className="rounded-lg object-cover"
        />
        <span className="text-xs text-gray block mt-2">{storyCreatedAt}</span>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;
