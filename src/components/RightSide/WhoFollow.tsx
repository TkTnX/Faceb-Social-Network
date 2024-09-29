import { MoreHorizontal } from "lucide-react";
import { WhoFollowList } from "..";
import { prisma } from "@/lib/client";

const WhoFollow = async ({ currentUser: userId }: { currentUser: string }) => {
  if (!userId) return null;
  const followers = await prisma.follower.findMany({
    where: {
      followingId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      follower: true,
    },
  });

  if (!followers || followers.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h4 className="text-[#203758] text-lg font-medium">New Followers</h4>
        <button>
          <MoreHorizontal />
        </button>
      </div>
      <WhoFollowList requests={followers} />
    </div>
  );
};

export default WhoFollow;
