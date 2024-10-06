import { Block, Follower, User } from "@prisma/client";
import { Birthdays, UserBadge, UserMedia } from "..";
import { UserWithFollowersAndFollowing } from "../CenterSide/UserCard";

export type UserFollowingsWithBirthday = Follower & {
  following: User
}

const LeftSide = ({
  user,
  type,
  userFollowers,
  userFollowings,
  isCurrentUserBlocked,
}: {
  user: UserWithFollowersAndFollowing;
  type: "home" | "profile";
  userFollowers?: Follower[];
  userFollowings?: UserFollowingsWithBirthday[];
  isCurrentUserBlocked?: Block | null;
}) => {
  return (
    <div className="hidden lg:block lg:w-[25%]">
      {user && type !== "profile" && (
        <UserBadge userFollowers={userFollowers} user={user} />
      )}
      {user && type === "profile" && !isCurrentUserBlocked && (
        <UserMedia userId={user.id} />
      )}

      <Birthdays userFollowings={userFollowings}  />
    </div>
  );
};

export default LeftSide;
