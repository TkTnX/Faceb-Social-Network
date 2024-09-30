import { prisma } from "@/lib/client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  userId: string;
  userNickname: string;
}


const UserFollowings: React.FC<Props> = async ({
  children,
  userId,
  userNickname,
}) => {
  const list = await prisma.follower.findMany({
    where: {
      followerId: userId,
    },
    include: {
      following: {
        select: {
          id: true,
          nickname: true,
          firstname: true,
          lastname: true,
          avatar: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogTitle>
          User Followings{" "}
          <span className="text-gray text-sm">@{userNickname}</span>
        </DialogTitle>
        <div className="grid gap-2">
          {list.length > 0
            ? list.map((user) => (
                <Link
                  href={`/profile/${user.following.nickname}`}
                  key={user.following.id}
                  className="flex justify-between w-full gap-2 bg-gray/20 p-2 rounded-lg hover:bg-gray/30 duration-200"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      className="rounded-full h-10"
                      src={user.following.avatar || "/noAvatar.jpg"}
                      alt="avatar"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h5 className="font-bold text-main">
                        {user.following.firstname ||
                          (user.following.lastname &&
                            `${user.following.firstname} ${user.following.lastname}`)}
                      </h5>
                      <p className="text-xs text-gray">
                        @{user.following.nickname}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            : "You don't have any followings"}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserFollowings;
