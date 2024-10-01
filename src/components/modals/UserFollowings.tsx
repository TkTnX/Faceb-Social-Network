import { prisma } from "@/lib/client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { Follower, User } from "@prisma/client";

interface Props {
  children: React.ReactNode;
  userNickname: string;
  userFollowing: {
    id: number;
    createdAt: Date;
    followerId: string;
    followingId: string;
    following: User;
  }[];
}

const UserFollowings: React.FC<Props> = async ({
  children,
  userNickname,
  userFollowing,
}) => {

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogTitle>
          User Followings{" "}
          <span className="text-gray text-sm">@{userNickname}</span>
        </DialogTitle>
        <div className="grid gap-2">
          {userFollowing.length > 0
            ? userFollowing.map(({ following }) => (
                <Link
                  href={`/profile/${following.nickname}`}
                  key={following.id}
                  className="flex justify-between w-full gap-2 bg-gray/20 p-2 rounded-lg hover:bg-gray/30 duration-200"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      className="rounded-full h-10"
                      src={following.avatar || "/noAvatar.jpg"}
                      alt="avatar"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h5 className="font-bold text-main">
                        {following.firstname ||
                          (following.lastname &&
                            `${following.firstname} ${following.lastname}`)}
                      </h5>
                      <p className="text-xs text-gray">@{following.nickname}</p>
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
