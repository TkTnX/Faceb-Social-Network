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



const UserFollowers: React.FC<Props> = async ({
  children,
  userId,
  userNickname,
}) => {
  const list = await prisma.follower.findMany({
    where: {
      followingId: userId,
    },
    include: {
      follower: {
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
          User Followers{" "}
          <span className="text-gray text-sm">@{userNickname}</span>
        </DialogTitle>
        <div className="grid gap-2">
          {list.length > 0
            ? list.map((user) => (
                <Link
                  href={`/profile/${user.follower.nickname}`}
                  key={user.follower.id}
                  className="flex justify-between w-full gap-2 bg-gray/20 p-2 rounded-lg hover:bg-gray/30 duration-200"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      className="rounded-full h-10"
                      src={user.follower.avatar || "/noAvatar.jpg"}
                      alt="avatar"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h5 className="font-bold text-main">
                        {user.follower.firstname ||
                          (user.follower.lastname &&
                            `${user.follower.firstname} ${user.follower.lastname}`)}
                      </h5>
                      <p className="text-xs text-gray">
                        @{user.follower.nickname}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            : "You don't follow anyone"}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserFollowers;
