import { Follower } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { UserWithFollowersAndFollowing } from "../CenterSide/UserCard";
import { Card } from "../ui/card";

const UserBadge = ({
  user,
  userFollowers,
}: {
  user: UserWithFollowersAndFollowing;
  userFollowers?: Follower[];
}) => {
  return (
    <Card className=" rounded-lg border  p-3 mb-9 shadow-none" >
      <div className="relative h-20 w-full">
        <Image
          src={user.profileBg || "/noProfileBg.jpg"}
          alt="profile bg"
          fill
          className="w-full object-cover"
        />
      </div>

      <div className="-mt-5 relative grid text-center">
        <Image
          src={user.avatar || "/noAvatar.jpg"}
          width={40}
          height={40}
          alt="avatar"
          className="rounded-full h-10 justify-self-center"
        />
        <h6 className="text-sm font-medium text-[#203758]">
          {user.firstname || user.lastname
            ? `${user.firstname} ${user.lastname}`
            : user.nickname}
        </h6>
        <p className="text-xs text-gray">
          {userFollowers?.length === 0 || !userFollowers?.length
            ? "0 "
            : userFollowers.length}
          {userFollowers?.length === 1 ? " follower" : " followers"}
        </p>
        <Link
          className="text-main bg-main/10 max-w-max px-2 py-1 rounded-md mx-auto mt-3 hover:text-white hover:bg-main duration-100"
          href={`/profile/${user.nickname}`}
        >
          My profile
        </Link>
      </div>
    </Card>
  );
};

export default UserBadge;
