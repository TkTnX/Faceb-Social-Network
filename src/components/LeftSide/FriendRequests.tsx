import { FriendRequestItem } from "..";

const FriendRequests = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h4 className="text-[#203758] text-lg font-medium">Friend Requests</h4>
        <button className="text-main">See all</button>
      </div>
      <div className="bg-white rounded-lg border border-[#F1F2F6] p-3 mt-4">
        <FriendRequestItem  />
        <FriendRequestItem />
        <FriendRequestItem />
        <FriendRequestItem />
        <FriendRequestItem />
      </div>
    </div>
  );
};

export default FriendRequests;
