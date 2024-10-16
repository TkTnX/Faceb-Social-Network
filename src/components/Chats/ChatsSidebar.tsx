import ChatsUsersList from "./ChatsUsersList";

const ChatsSidebar = () => {
  return (
    <div className="hidden sm:flex flex-col gap-2 border-r border-gray/20 pr-1 sm:pr-3 min-w-[20%] w-1/5">
      <ChatsUsersList size="lg" />
    </div>
  );
};

export default ChatsSidebar;
