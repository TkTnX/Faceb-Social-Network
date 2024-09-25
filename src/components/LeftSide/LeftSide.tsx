import { Follower, User } from "@prisma/client";
import { FriendRequests, UserBadge } from "..";

const LeftSide = ({
  user,
  type,
}: {
  user: User & { _count: { followers: number } };
  type: "home" | "profile";
}) => {
  return (
    <div className="hidden lg:block lg:w-[25%]">
      {user && type !== "profile" && <UserBadge user={user} />}

      <FriendRequests />
    </div>
  );
};

export default LeftSide;
