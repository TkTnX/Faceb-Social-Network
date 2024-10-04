"use client";
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
  userFollowers: {
    id: number;
    createdAt: Date;
    followerId: string;
    followingId: string;
    follower: User;
  }[];
}

const UserFollowers: React.FC<Props> = ({
  children,
  userNickname,
  userFollowers,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogTitle>
          User Followers{" "}
          <span className="text-gray text-sm">@{userNickname}</span>
        </DialogTitle>
        <div className="grid gap-2">
          {userFollowers.length > 0
            ? userFollowers.map(({ follower }) => (
                <Link
                  href={`/profile/${follower.nickname}`}
                  key={follower.id}
                  className="flex justify-between w-full gap-2 bg-gray/20 p-2 rounded-lg hover:bg-gray/30 duration-200"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      className="rounded-full h-10"
                      src={follower.avatar || "/noAvatar.jpg"}
                      alt="avatar"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h5 className="font-bold text-main">
                        {follower.firstname ||
                          (follower.lastname &&
                            `${follower.firstname} ${follower.lastname}`)}
                      </h5>
                      <p className="text-xs text-gray">@{follower.nickname}</p>
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
