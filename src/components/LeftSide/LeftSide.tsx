import { Block, Follower } from "@prisma/client";
import { Birthdays, UserBadge, UserMedia } from "..";
import { UserWithFollowersAndFollowing } from "../CenterSide/UserCard";

const LeftSide = ({
  user,
  type,
  userFollowers,
  isCurrentUserBlocked
}: {
  user: UserWithFollowersAndFollowing;
  type: "home" | "profile";
    userFollowers?: Follower[];
        isCurrentUserBlocked?: Block | null;
  
}) => {
  return (
    <div className="hidden lg:block lg:w-[25%]">
      {user && type !== "profile" && (
        <UserBadge userFollowers={userFollowers} user={user} />
      )}
      {user && type === "profile" && !isCurrentUserBlocked && <UserMedia userId={user.id} />}

      <Birthdays />
    </div>
  );
};

export default LeftSide;
