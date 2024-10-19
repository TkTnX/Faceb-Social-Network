import { UserChatType } from "@/@types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ChatUser } from "./ChatHeader";

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
    <Link
      href={isInSidebar ? `/c/${chatId}` : `/profile/${user.nickname}`}
      className={cn(
        " flex items-center gap-2 hover:bg-main/20  hover:opacity-80 duration-150 sm:pl-2 sm:pr-4 py-1 rounded-lg justify-center sm:justify-normal",
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
        className={cn("hidden md:block", { "block md:block": !isInSidebar })}
      >
        <h6 className="text-sm text-main">
          {user.firstname ||
            (user.lastname && `${user.firstname} ${user.lastname}`)}
        </h6>
        <p className="text-gray text-xs">@{user.nickname}</p>
      </div>
    </Link>
  );
};

export default ChatsUserItem;
