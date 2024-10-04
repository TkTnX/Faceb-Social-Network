import { Block } from "@prisma/client";
import { AddNewPost, Feed, UserCard } from "..";
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
      {type === "home" && <AddNewPost user={user} />}

      {/* POSTS */}
      {isUserBlocked !== null || isCurrentUserBlocked !== null ? null : (
        <Feed type={type} userId={user?.id} />
      )}
    </div>
  );
};

export default CenterSide;
