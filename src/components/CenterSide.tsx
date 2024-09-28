import { Follower } from "@prisma/client";
import { AddNewPost, Feed, UserCard } from ".";
import { UserWithCount } from "./UserCard";

const CenterSide = ({
  type,
  user,
  userFollowers,
}: {
  type: "home" | "profile";
  user?: UserWithCount;
  userFollowers?: Follower[];
}) => {
  return (
    <div className="w-full sm:w-[65%] xl:w-[65%] lg:w-[50%] ">
      {type === "profile" && (
        <UserCard userFollowers={userFollowers} user={user} />
      )}
      {type === "home" && <AddNewPost user={user} />}

      {/* POSTS */}
      <Feed />
    </div>
  );
};

export default CenterSide;
