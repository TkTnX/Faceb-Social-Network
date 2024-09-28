import { CenterSide, LeftSide, RightSide } from "@/components";
import { prisma } from "@/lib/client";
import { notFound } from "next/navigation";

const ProfilePage = async ({ params }: { params: { nickname: string } }) => {
  const { nickname } = params;

  const user = await prisma.user.findFirst({
    where: {
      nickname,
    },
    include: {
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

  const userFollowers = await prisma.follower.findMany({
    where: {
      followingId: user.id,
    },
  });

  return (
    <div className="flex items-start gap-3 lg:gap-7 justify-between max-w-[1317px] px-4 mx-auto">
      {/* LEFT */}
      <LeftSide type="profile" user={user} />
      {/* CENTER */}
      <CenterSide type="profile" user={user} userFollowers={userFollowers} />
      {/* RIGHT */}
      <RightSide user={user} />
    </div>
  );
};

export default ProfilePage;
