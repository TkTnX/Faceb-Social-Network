import ChatsUsersList from "./ChatsUsersList";

const ChatsSidebarMobile = () => {
  return (
    <div className=" flex sm:hidden  flex-col gap-2 border-t border-gray/20 pr-1 sm:pr-3 min-w-[20%] w-full ">
      <ChatsUsersList size="sm" />
    </div>
  );
}

export default ChatsSidebarMobile