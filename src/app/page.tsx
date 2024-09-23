import {
  AddNewPost,
  FriendRequestItem,
  FriendRequests,
  Post,
  Stories,
  UserBadge,
  WhoFollow,
} from "@/components";

const Homepage = () => {
  return (
    <div className="flex items-start gap-3 lg:gap-7 justify-between max-w-[1317px] px-4 mx-auto">
      {/* LEFT */}
      <div className="hidden lg:block lg:w-[25%]">
        <UserBadge />

        <FriendRequests />
        </div>
      {/* CENTER */}
      <div className="w-full sm:w-[65%] xl:w-[65%] lg:w-[50%] ">
        <AddNewPost />
        {/* POSTS */}

        <div className="grid gap-3 mt-3">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
      {/* RIGHT */}
      <div className="hidden  sm:block sm:w-[35%] xl:w-[30%] ">
        <Stories />
        <WhoFollow />
      </div>
    </div>
  );
};

export default Homepage;
