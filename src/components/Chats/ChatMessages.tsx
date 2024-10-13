const ChatMessages = () => {
    const messages = []
  return (
    <div className="flex-1 h-full w-full">
      {messages.length > 0 ? "" : <span className="text-center text-gray h-full flex items-center justify-center">No messages yet</span>}
    </div>
  );
}

export default ChatMessages