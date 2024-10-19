import { UserChats } from "@prisma/client";
import { MoreHorizontal, Search } from "lucide-react";
import { ChatsUserItem } from ".";

export type ChatUser = {
  id: string;
  avatar: string | null;
  firstname: string;
  lastname: string;
  nickname: string;
};
  
   

const ChatHeader = ({ user }: { user: ChatUser}) => {
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
