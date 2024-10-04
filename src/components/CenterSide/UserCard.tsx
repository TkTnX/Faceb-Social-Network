import { Block, User } from "@prisma/client";
import Image from "next/image";
import UserFollowers from "../modals/UserFollowers";
import UserFollowings from "../modals/UserFollowings";

export type UserWithFollowersAndFollowing = User & {
  followers?: {
    id: number;
    createdAt: Date;
    followerId: string;
    followingId: string;
    following: User;
  }[];
  following?: {
    id: number;
    createdAt: Date;
    followerId: string;
    followingId: string;
    follower: User;
  }[];
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
};

const UserCard = async ({
  user,
  isUserBlocked,
  isCurrentUserBlocked,
}: {
  user?: UserWithFollowersAndFollowing;
  isUserBlocked?: Block | null;
  isCurrentUserBlocked?: Block | null;
}) => {
  if (!user) return null;

  if (isCurrentUserBlocked) {
    return (
      <div className="bg-white text-2xl text-center mb-10 p-10 font-bold">
        This user is blocking you
      </div>
    );
  }

  if (isUserBlocked) {
    return (
      <div className="bg-white text-gray text-2xl text-center mb-10 p-10 font-bold">
        You are blocking this user <br />{" "}
        <p>Unblock him to add him to your followers</p>
      </div>
    );
  }
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
          <UserFollowers
            userFollowers={user.following || []}
            userNickname={user.nickname}
          >
            <button className="text-center text-xs">
              <span className="text-gray text-sm">{user._count.following}</span>
              <h6 className="text-black/80 font-bold">
                {user._count.following === 1 ? "Follower" : "Followers"}
              </h6>
            </button>
          </UserFollowers>
          <UserFollowings
            userFollowing={user.followers || []}
            userNickname={user.nickname}
          >
            <button className="text-center text-xs">
              <span className="text-gray text-sm">{user._count.followers}</span>
              <h6 className="text-black/80 font-bold">Following</h6>
            </button>
          </UserFollowings>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
