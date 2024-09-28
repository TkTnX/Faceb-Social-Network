"use client";
import { FollowRequest, User } from "@prisma/client";
import WhoFollowItem from "./WhoFollowItem";
import { useState } from "react";

export type WhoFollowType = FollowRequest & {
  sender: User;
};

const WhoFollowList = ({ requests }: { requests: WhoFollowType[] }) => {
  const [followRequests, setFollowRequests] = useState(requests);

  
  return (
    <div className="mt-4 rounded-lg bg-white border border-[#F1F2F6] py-4 px-6">
      {followRequests.map((request) => (
        <WhoFollowItem
          setFollowRequests={setFollowRequests}
          key={request.id}
          sender={request.sender}
        />
      ))}
    </div>
  );
};

export default WhoFollowList;
