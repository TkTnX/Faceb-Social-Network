import { FriendsPageItem } from "@/components";
import FriendsYouCanFollowList from "@/components/CenterSide/FriendsYouCanFollowList";
import { prisma } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";

const FriendsPage = async () => {
  const { userId: currentUser } = auth();

  if (!currentUser) {
    return null;
  }

  const friends = await prisma.follower.findMany({
    where: {
      followerId: currentUser,
    },
    include: {
      following: true,
    },
  });

  const users = await prisma.user.findMany({
    where: {
      NOT: {
        OR: [
          { id: currentUser },
          {
            id: {
              in: friends.map((friend) => friend.followingId),
            },
          },
        ],
      },
    },
  });

  return (
    <div className="max-w-[1317px] px-4 mx-auto">
      <div>
        <h2 className="text-2xl font-bold">Your friends</h2>

        <div className="mt-3 flex gap-3 flex-wrap bg-white p-3 rounded-lg border border-[#F1F2F6]">
          {friends.length > 0 ? (
            friends.map((user) => (
              <FriendsPageItem
                isFriends={true}
                key={user.id}
                user={user.following}
              />
            ))
          ) : (
            <span>You don&lsquo;t have any friends yet</span>
          )}
        </div>
      </div>
      <div className="mt-10 ">
        <h2 className="text-2xl font-bold">You can also follow</h2>

        <FriendsYouCanFollowList users={users} />
      </div>
    </div>
  );
};

export default FriendsPage;
