"use server";
import { MoreHorizontal } from "lucide-react";
import { WhoFollowList } from ".";
import { prisma } from "@/lib/client";
import { auth } from "@clerk/nextjs/server";

const WhoFollow = async () => {
  const { userId } = auth();
  if (!userId) return null;
  const followRequests = await prisma.followRequest.findMany({
    where: {
      receiverId: userId,
    },
    include: {
      sender: true,
    },
  });

  if (!followRequests || followRequests.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h4 className="text-[#203758] text-lg font-medium">Who to Follow</h4>
        <button>
          <MoreHorizontal />
        </button>
      </div>
      <WhoFollowList requests={followRequests} />
    </div>
  );
};

export default WhoFollow;
