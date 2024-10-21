import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ChatUser } from "./ChatHeader";
import { MoreHorizontal } from "lucide-react";
import ChatUserItemMore from "./ChatUserItemMore";

const ChatsUserItem = ({
  user,
  isInSidebar = true,
  chatId,
}: {
  user: ChatUser | null;
  isInSidebar?: boolean;
  chatId?: number;
}) => {
  if (!user) return null;
  return (
    <div className="relative">
      <Link
        href={isInSidebar ? `/c/${chatId}` : `/profile/${user.nickname}`}
        className={cn(
          " flex items-center gap-2 hover:bg-main/20  hover:opacity-80 duration-150 sm:pl-2 sm:pr-4 py-1 rounded-lg justify-center sm:justify-normal relative group",
          { "max-w-max pl-2 pr-4": !isInSidebar }
        )}
      >
        <Image
          src={user.avatar || "/noAvatar.jpg"}
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full h-10 w-10"
        />
        <div
          className={cn("hidden md:block ", { "block md:block": !isInSidebar })}
        >
          <h6 className="text-sm text-main">
            {user.firstname ||
              (user.lastname && `${user.firstname} ${user.lastname}`)}
          </h6>
          <p className="text-gray text-xs">@{user.nickname}</p>
        </div>
      </Link>
      {isInSidebar && (
        <ChatUserItemMore chatId={chatId} userId={user.id}>
          <button className="absolute top-1 right-1 opacity-100 ">
            <MoreHorizontal size={16} />
          </button>
        </ChatUserItemMore>
      )}
    </div>
  );
};

export default ChatsUserItem;
