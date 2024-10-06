import { CenterSide, LeftSide, RightSide } from "@/components";
import { prisma } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";

const Homepage = async () => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) return null;
  const user = await prisma.user.findFirst({
    where: {
      id: currentUserId,
    },
    include: {
      _count: {
        select: {
          followers: true,
          posts: true,
          following: true,
        },
      },
    },
  });
  if (!user) return null;

  const userFollowers = await prisma.follower.findMany({
    where: {
      followingId: user.id,
    },
  });

  const userFollowings = await prisma.follower.findMany({
    where: {
      followerId: user.id,
      NOT: {
        following: {
          birthday: null,
        },
      },
    },

    include: {
      following: true,
    },

    take: 5,

    orderBy: {
      following: {
        birthday: "asc",
      },
    }
  });

  return (
    <div className="flex items-start gap-3 lg:gap-7 justify-center lg:justify-between max-w-[1317px] px-4 mx-auto">
      {/* LEFT */}
      <LeftSide
        type="home"
        userFollowings={userFollowings}
        userFollowers={userFollowers}
        user={user}
      />
      {/* CENTER */}
      <CenterSide type="home" user={user} />
      {/* RIGHT */}
      <RightSide currentUser={currentUserId} />
    </div>
  );
};

export default Homepage;
