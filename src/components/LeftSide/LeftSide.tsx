import { FollowRequest, User } from "@prisma/client";
import { Birthdays, FriendRequests, UserBadge } from "..";

const LeftSide = ({
  user,
  type,
}: {
  user: User & { _count: { followers: number }; followRequestsReceived?: FollowRequest[] };
  type: "home" | "profile";
  }) => {
  return (
    <div className="hidden lg:block lg:w-[25%]">
      {user && type !== "profile" && <UserBadge user={user} />}

      {user.followRequestsReceived && <FriendRequests followRequests={user.followRequestsReceived} />}
      <Birthdays />
    </div>
  );
};

export default LeftSide;
