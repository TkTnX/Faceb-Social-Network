import { CenterSide, LeftSide, RightSide } from "@/components";
import { prisma } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

const ProfilePage = async ({ params }: { params: { nickname: string } }) => {
  const { nickname } = params;
  const { userId: currentUser } = auth();

  if (!currentUser) return notFound();
  const user = await prisma.user.findFirst({
    where: {
      nickname,
    },
    include: {
      followers: {
        include: {
          following: true,
        },
      },
      following: {
        include: {
          follower: true,
        },
      },
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        },
      },
    },
  });

  if (!user) return notFound();

  const isCurrentUserBlocked = await prisma.block.findFirst({
    where: {
      blockedId: currentUser,
      blockerId: user.id,
    },
  });

  const isUserBlocked = await prisma.block.findFirst({
    where: {
      blockedId: user.id,
      blockerId: currentUser,
    },
  });


  return (
    <div className="flex items-start gap-3 lg:gap-7 justify-between max-w-[1317px] px-4 mx-auto">
      {/* LEFT */}
      <LeftSide
        isCurrentUserBlocked={isCurrentUserBlocked}
        type="profile"
        user={user}
      />
      {/* CENTER */}
      <CenterSide
        type="profile"
        user={user}
        isCurrentUserBlocked={isCurrentUserBlocked}
        isUserBlocked={isUserBlocked}
      />
      {/* RIGHT */}
      <RightSide
        isCurrentUserBlocked={isCurrentUserBlocked}
        isBlocked={Boolean(isUserBlocked) || Boolean(isCurrentUserBlocked)}
        currentUser={currentUser ? currentUser : ""}
        user={user}
      />
    </div>
  );
};

export default ProfilePage;
