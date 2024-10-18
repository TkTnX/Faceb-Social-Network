"use server";
import { prisma } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ChatsUserItem from "./ChatsUserItem";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

const ChatsUsersList = async ({size}: {size: "sm" | "lg"}) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) redirect("/");
  const userFollowings = await prisma.follower.findMany({
    where: {
      followerId: currentUserId,
    },
    include: {
      following: {
        select: {
          id: true,
          nickname: true,
          firstname: true,
          lastname: true,
          avatar: true,
        },
      },
    },
  });
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
        {userFollowings.length > 0 ? (
          userFollowings.map((user) => (
            <ChatsUserItem
              isInSidebar={true}
              key={user.following.id}
              user={user.following}
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
