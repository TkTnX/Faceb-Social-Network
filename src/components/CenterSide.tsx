import { AddNewPost, Feed, UserCard } from ".";

const CenterSide = ({ type }: { type: "home" | "profile" }) => {
  return (
    <div className="w-full sm:w-[65%] xl:w-[65%] lg:w-[50%] ">
      {type === "profile" && <UserCard />}
      {type === "home" && <AddNewPost />}

      {/* POSTS */}
      <Feed />
    </div>
  );
};

export default CenterSide;
