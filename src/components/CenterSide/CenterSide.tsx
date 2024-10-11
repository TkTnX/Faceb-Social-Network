import { Block } from "@prisma/client";
import {  Feed, UserCard } from "..";
import { UserWithFollowersAndFollowing } from "./UserCard";

const CenterSide = ({
  type,
  user,
  isUserBlocked,
  isCurrentUserBlocked,
}: {
  type: "home" | "profile";
  user?: UserWithFollowersAndFollowing;
  isUserBlocked?: Block | null;
  isCurrentUserBlocked?: Block | null;
}) => {
  return (
    <div className="w-full sm:w-[65%] xl:w-[65%] lg:w-[50%] ">
      {type === "profile" && (
        <UserCard
          isUserBlocked={isUserBlocked}
          isCurrentUserBlocked={isCurrentUserBlocked}
          user={user}
        />
      )}
      

      {/* POSTS */}

      <Feed
        isUserBlocked={isUserBlocked}
        isCurrentUserBlocked={isCurrentUserBlocked}
        type={type}
        user={user}
      />
    </div>
  );
};

export default CenterSide;
