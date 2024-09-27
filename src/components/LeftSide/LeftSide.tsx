import { Birthdays, UserBadge, UserMedia } from "..";
import { UserWithCount } from "../UserCard";

const LeftSide = ({
  user,
  type,
}: {
  user: UserWithCount;
  type: "home" | "profile";
  }) => {
  return (
    <div className="hidden lg:block lg:w-[25%]">
      {user && type !== "profile" && <UserBadge user={user} />}
      {user && type === "profile" && <UserMedia userId={user.id}  />}

      <Birthdays />
    </div>
  );
};

export default LeftSide;
