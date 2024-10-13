import { UserChatType } from "@/@types";
import ChatsUserItem from "./ChatsUserItem";
import { MoreHorizontal, Search } from "lucide-react";

const ChatHeader = ({ user }: { user: UserChatType }) => {
  return (
    <header className="flex items-center justify-between border-b border-b-gray/20 pb-2 pl-2">
      <ChatsUserItem isInSidebar={false} user={user} />
      <div className="flex items-center gap-2">
        <button className="hover:opacity-80">
          <Search size={20} />
        </button>
        <button className="hover:opacity-80">
          <MoreHorizontal size={20} />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
