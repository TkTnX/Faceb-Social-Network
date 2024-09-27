import { prisma } from "@/lib/client";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

const UserMedia = async ({ userId }: { userId: string }) => {
  const userPosts = await prisma.post.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      img: true,
    },
  });

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between">
        <h4 className="text-[#203758] text-lg font-medium">User Media</h4>
        <button>
          <MoreHorizontal />
        </button>
      </div>
      <div className="bg-white rounded-lg border border-[#F1F2F6] p-3">
        {userPosts.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {userPosts.map((post) => (
              <Image
                key={post.id}
                src={post.img}
                alt="post"
                width={50}
                height={50}
                className="rounded-xl"
              />
            ))}
          </div>
        ) : (
          <span className="text-gray text-sm">No user media yet</span>
        )}
      </div>
    </div>
  );
};

export default UserMedia;
