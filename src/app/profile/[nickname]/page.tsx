import { CenterSide, LeftSide, RightSide } from "@/components";
import { prisma } from "@/lib/client";
import { redirect } from "next/navigation";

const ProfilePage = async ({ params }: { params: { nickname: string } }) => {
  const { nickname } = params;

  const user = await prisma.user.findFirst({
    where: {
      nickname,
    },
    include: {
      _count: {
        select: {
          followers: true,
          posts: true,
          following: true,
        },
      },
      followRequestsReceived: true,
    },
  });

  if (!user) return redirect("/");

  return (
    <div className="flex items-start gap-3 lg:gap-7 justify-between max-w-[1317px] px-4 mx-auto">
      {/* LEFT */}
      <LeftSide type="profile" user={user} />
      {/* CENTER */}
      <CenterSide type="profile" user={user} />
      {/* RIGHT */}
      <RightSide user={user} />
    </div>
  );
};

export default ProfilePage;
