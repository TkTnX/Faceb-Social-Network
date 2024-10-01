import { AddNewPost, Feed, UserCard } from "..";
import { UserWithFollowersAndFollowing } from "./UserCard";

const CenterSide = ({
  type,
  user,
}: {
  type: "home" | "profile";
  user?: UserWithFollowersAndFollowing;
}) => {
  return (
    <div className="w-full sm:w-[65%] xl:w-[65%] lg:w-[50%] ">
      {type === "profile" && <UserCard user={user} />}
      {type === "home" && <AddNewPost user={user} />}

      {/* POSTS */}
      <Feed type={type} userId={user?.id} />
    </div>
  );
};

export default CenterSide;
