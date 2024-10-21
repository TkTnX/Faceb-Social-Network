import { ChatsUserItem } from "@/components/Chats";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { UserChats } from "@prisma/client";

type ChatsUsersListProps = {
  id: string;
  nickname: string;
  firstname: string;
  lastname: string;
  avatar: string | null;
  userChats: { chatId: number }[];
};

const ChatsUsersList = ({
  size,
  filteredUserChats,
}: {
  size: "sm" | "lg";
  filteredUserChats: ChatsUsersListProps[];
}) => {
  if (!filteredUserChats || filteredUserChats.length === 0) return null;
  return (
    <div className="flex flex-col gap-3 pt-2">
      {size === "lg" && (
        <h3 className="text-center sm:text-left font-bold text-xl">Chats</h3>
      )}

      <Input placeholder="Find chats" />

      <div
        className={cn("", {
          "flex w-full gap-3 overflow-x-auto scrollbar": size === "sm",
        })}
      >
        {filteredUserChats.length > 0 ? (
          filteredUserChats.map((user) => (
            <ChatsUserItem
              isInSidebar={true}
              key={user && user.id}
              user={user ? user : null}
              chatId={user && user.userChats[user.userChats.length - 1].chatId}
            />
          ))
        ) : (
          <span className="text-gray text-xs font-medium">
            You do not have any chats yet
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatsUsersList;
