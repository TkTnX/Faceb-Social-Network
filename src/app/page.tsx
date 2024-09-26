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
        }
      },
    }
  });
  if (!user) return null;
  return (
    <div className="flex items-start gap-3 lg:gap-7 justify-between max-w-[1317px] px-4 mx-auto">
      {/* LEFT */}
      <LeftSide type="home" user={user} />
      {/* CENTER */}
      <CenterSide type="home" user={user} />
      {/* RIGHT */}
      <RightSide />
    </div>
  );
};

export default Homepage;
