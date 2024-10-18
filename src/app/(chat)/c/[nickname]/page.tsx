import ChatForm from "@/components/Chats/ChatForm";
import ChatHeader from "@/components/Chats/ChatHeader";
import ChatMessages from "@/components/Chats/ChatMessages";
import { prisma } from "@/lib/client";
import { notFound } from "next/navigation";

const Nickname = async ({ params }: { params: { nickname: string } }) => {
  const userByNickname = await prisma.user.findFirst({
    where: {
      nickname: params.nickname,
    },
    select: {
      id: true,
      nickname: true,
      firstname: true,
      lastname: true,
      avatar: true,
    },
  });

  if (!userByNickname) {
    return notFound();
  }

  return (
    <div className="w-full flex flex-col justify-between h-full">
      <ChatHeader user={userByNickname} />
      <ChatMessages />
      <ChatForm />
    </div>
  );
};

export default Nickname;
