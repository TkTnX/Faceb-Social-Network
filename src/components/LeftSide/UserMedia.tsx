import { prisma } from "@/lib/client";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "../ui/card";

const UserMedia = async ({ userId }: { userId: string }) => {
  const userPosts = await prisma.post.findMany({
    where: {
      userId,
      img: { not: "" },
    },
    select: {
      id: true,
      img: true,
    },
  });

  const filteredUserPosts = userPosts.filter((post) => !post.img.includes("video"));

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between">
        <h4 className="text-[#203758] text-lg font-medium">User Media</h4>
      </div>
      <Card className=" rounded-lg border  p-3 shadow-none">
        {filteredUserPosts.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 items-center">
            {filteredUserPosts
              .filter((post) => !post.img.includes("video"))
              .map((post) => (
                <Link key={post.id} href={`/post/${post.id}`}>
                  <Image
                    src={post.img}
                    alt="post"
                    width={50}
                    height={50}
                    className="rounded-xl object-cover max-h-[50px] max-w-[50px]"
                  />
                </Link>
              ))}
          </div>
        ) : (
          <span className="text-gray text-sm">No user media yet</span>
        )}
      </Card>
    </div>
  );
};

export default UserMedia;
