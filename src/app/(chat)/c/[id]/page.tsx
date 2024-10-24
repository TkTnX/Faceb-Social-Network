import ChatForm from "@/components/Chats/ChatForm";
import ChatHeader from "@/components/Chats/ChatHeader";
import ChatMessages from "@/components/Chats/ChatMessages";
import { prisma } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
const UserChatPage = async ({ params }: { params: { id: string } }) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) return notFound();
  const userChats = await prisma.userChats.findFirst({
    where: {
      AND: {
        userId: currentUserId,
        chatId: Number(params.id),
      },
    },
    include: {
      chat: {
        include: {
          messages: true,
          userChats: {
            include: {
              user: {
                select: {
                  id: true,
                  avatar: true,
                  firstname: true,
                  lastname: true,
                  nickname: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!userChats || !userChats.chat) {
    return notFound();
  }



  return (
    <div className="h-full w-full flex items-start justify-between">
      <div className="w-full flex flex-col justify-between h-full">
        <ChatHeader
          user={
            userChats.chat.userChats.filter(
              (u) => u.user.id !== currentUserId
            )[0].user
          }
        />
        <ChatMessages messages={userChats.chat.messages} />
        <ChatForm chatId={Number(params.id)} />
      </div>
    </div>
  );
};

export default UserChatPage;
