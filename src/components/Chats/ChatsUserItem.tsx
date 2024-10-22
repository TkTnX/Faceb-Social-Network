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
  lastMessage,
}: {
  user: ChatUser | null;
  isInSidebar?: boolean;
  chatId?: number;
  lastMessage?: string | null;
}) => {
  if (!user) return null;
  return (
    <div className="relative pr-5 sm:pr-0">
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
          className="rounded-full h-10 w-10 min-h-10 min-w-10"
        />
        <div className="flex items-center  justify-between w-full">
          <div
            className={cn("hidden md:block ", {
              "block md:block": !isInSidebar,
            })}
          >
            <h6 className="text-sm text-main">
              {user.firstname ||
                (user.lastname && `${user.firstname} ${user.lastname}`)}
            </h6>
            <p className="text-xs text-gray bigText">{lastMessage}</p>
          </div>
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
