import { Follower } from "@prisma/client";
import { Birthdays, UserBadge, UserMedia } from "..";
import { UserWithCount } from "../UserCard";

const LeftSide = ({
  user,
  type,
  userFollowers,
}: {
  user: UserWithCount;
  type: "home" | "profile";
  userFollowers?: Follower[];
}) => {
  return (
    <div className="hidden lg:block lg:w-[25%]">
      {user && type !== "profile" && <UserBadge userFollowers={userFollowers} user={user} />}
      {user && type === "profile" && <UserMedia userId={user.id} />}

      <Birthdays />
    </div>
  );
};

export default LeftSide;
