"use client";
import { switchBlock, switchFollow } from "@/lib/actions";
import { useOptimistic, useState } from "react";

interface Props {
  userId: string;
  isFollowing: boolean;
  isFollowed: boolean;
  isBlocked: boolean;
}

const UserInformationBlcokInteractive: React.FC<Props> = ({
  userId,
  isFollowing,
  isFollowed,
  isBlocked,
}) => {
  const [userStatus, setUserStatus] = useState({
    isFollowing,
    isFollowed,
    isBlocked,
  });
  const follow = async () => {
    switchFollowStatus("follow");
    try {
      await switchFollow(userId);

      setUserStatus({
        ...userStatus,
        isFollowing: userStatus.isFollowing && false,
        isFollowed:
          !userStatus.isFollowing && !userStatus.isFollowed ? true : false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const block = async () => {
    switchFollowStatus("block");
    try {
      await switchBlock(userId);

      setUserStatus({
        ...userStatus,
        isBlocked: !userStatus.isBlocked,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [followStatus, switchFollowStatus] = useOptimistic(
    userStatus,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...state,
            isFollowed: !state.isFollowing && !state.isFollowed ? true : false,
          }
        : {
            ...state,
            isBlocked: !userStatus.isBlocked,
          }
  );
  return (
    <>
      <form action={follow}>
        <button className="text-main bg-main/20 w-full mt-2 py-3 rounded-lg hover:bg-main hover:text-white duration-100">
          {followStatus.isFollowed ? "Following" : "Follow"}
        </button>
      </form>
      <form className="max-w-max ml-auto" action={block}>
        <button className="text-red-400 text-right w-full mt-2 text-xs">
          {followStatus.isBlocked ? "Unblock user" : "Block user"}
        </button>
      </form>
    </>
  );
};

export default UserInformationBlcokInteractive;
