"use client";
import {  Follower, User } from "@prisma/client";
import WhoFollowItem from "./WhoFollowItem";
import { useOptimistic, useState } from "react";

export type WhoFollowType = Follower & { follower: User };

const WhoFollowList = ({ requests }: { requests: WhoFollowType[] }) => {
  const [newFollowers, setNewFollowers] = useState(requests);

  const [optimisticFollowRequests, switchOptimisticFollowRequests] =
    useOptimistic(newFollowers, (state, value) => ({
      ...state,
      followRequests: state.filter((request) => request.followerId !== value),
    }));
  return (
    <div className="mt-4 rounded-lg bg-white border border-[#F1F2F6] py-4 px-6">
      {optimisticFollowRequests.length > 0 ? (
        optimisticFollowRequests.map((request) => (
          <WhoFollowItem
            setFollowRequests={setNewFollowers}
            switchOptimisticFollowRequests={switchOptimisticFollowRequests}
            key={request.id}
            followers={request}
          />
        ))
      ) : (
        <p>No follow requests</p>
      )}
    </div>
  );
};

export default WhoFollowList;
