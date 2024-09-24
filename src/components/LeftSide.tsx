import { FriendRequests, UserBadge } from ".";

const LeftSide = ({ userId }: { userId?: string }) => {
  return (
    <div className="hidden lg:block lg:w-[25%]">
      {userId && <UserBadge />}

      <FriendRequests />
    </div>
  );
};

export default LeftSide;
