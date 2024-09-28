import { Follower, User } from "@prisma/client";
import Image from "next/image";

export interface UserWithCount extends User {
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
}

const UserCard = ({
  user,
  userFollowers,
}: {
  user?: UserWithCount;
  userFollowers?: Follower[];
}) => {
  if (!user) return null;
  return (
    <div className="">
      <div className="relative h-52 w-full">
        <Image
          src={user.profileBg || "/noProfileBg.jpg"}
          alt="bg"
          fill
          className="rounded-lg object-cover"
        />
        <Image
          src={user.avatar || "/noAvatar.jpg"}
          width={128}
          height={128}
          className="rounded-full absolute left-0 right-0 m-auto -bottom-16 w-32 h-32 outline outline-4 outline-white"
          alt="avatar"
        />
      </div>

      <div className="text-center mt-20 pb-14">
        <h1 className="font-bold text-2xl">
          {user.firstname || user.lastname
            ? `${user.firstname} ${user.lastname}`
            : user.nickname}
        </h1>
        <div className="grid grid-cols-3 max-w-96 mx-auto  items-center justify-center gap-14 mt-3">
          <div className="text-center text-xs">
            <span className="text-gray text-sm">{user._count.posts}</span>
            <h6 className="text-black/80 font-bold">
              {user._count.posts === 1 ? "Post" : "Posts"}
            </h6>
          </div>
          <div className="text-center text-xs">
            <span className="text-gray text-sm">
              {userFollowers?.length === 0 ? 0 : userFollowers?.length}
            </span>
            <h6 className="text-black/80 font-bold">
              {userFollowers?.length === 1 ? "Follower" : "Followers"}
            </h6>
          </div>
          <div className="text-center text-xs">
            <span className="text-gray text-sm">{user._count.following}</span>
            <h6 className="text-black/80 font-bold">Following</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
