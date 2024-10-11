"use client";
import { switchBlock, switchFollow } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { useOptimistic, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  userId: string;
  isFollowed: boolean;
  isBlocked: boolean;
  size: "sm" | "lg"
}

const UserInformationBlcokInteractive: React.FC<Props> = ({
  userId,
  isFollowed,
  isBlocked,
  size
}) => {
  const [userStatus, setUserStatus] = useState({
    isFollowed,
    isBlocked,
  });
  const follow = async () => {
    switchFollowStatus("follow");
    try {
      await switchFollow(userId);

      setUserStatus({
        ...userStatus,
        isFollowed:
          !userStatus.isFollowed ? true : false,
      });
      toast.success(`${!userStatus.isFollowed ? "Followed" : "Unfollowed"} successfully`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
      toast.success("Blocked successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const [followStatus, switchFollowStatus] = useOptimistic(
    userStatus,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...state,
            isFollowed: !state.isFollowed ? true : false,
          }
        : {
            ...state,
            isBlocked: !userStatus.isBlocked,
          }
  );
  return (
    <div className={cn("", { "sm:hidden block": size === "sm" })}>
      {!followStatus.isBlocked && (
        <form action={follow}>
          <button className="text-main bg-main/20 w-full mt-2 py-3 rounded-lg hover:bg-main hover:text-white duration-100">
            {followStatus.isFollowed ? "Following" : "Follow"}
          </button>
        </form>
      )}
      <form className="max-w-max ml-auto" action={block}>
        <button className="text-red-400 text-right w-full mt-2 text-xs">
          {followStatus.isBlocked ? "Unblock user" : "Block user"}
        </button>
      </form>
    </div>
  );
};

export default UserInformationBlcokInteractive;
