import { declineFollowRequest } from "@/lib/actions";
import { Follower, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { WhoFollowType } from "./WhoFollowList";
import toast from "react-hot-toast";

type FollowersType = Follower & {
  follower: User;
};

const WhoFollowItem = ({
  followers,
  setFollowRequests,
  switchOptimisticFollowRequests,
}: {
  followers: FollowersType;
  setFollowRequests: (
    requests: (arr: WhoFollowType[]) => WhoFollowType[]
  ) => void;
  switchOptimisticFollowRequests: (id: string) => void;
}) => {
  const decline = async () => {
    switchOptimisticFollowRequests(followers.followerId);

    try {
      await declineFollowRequest(followers.followerId);

      setFollowRequests((prev) =>
        prev.filter((request) => request.followerId !== followers.followerId)
      );
      toast.success("Request declined");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-between last:border-0 border-b border-[#F1F2F6] py-3 first:pt-0">
      <Link className="flex items-center gap-4 group" href={`/profile/${followers.follower.nickname}`}>
        <Image
          src={followers.follower.avatar || "/noAvatar.jpg"}
          width={34}
          height={34}
          alt={followers.follower.nickname}
          className="rounded-full h-[34px] w-[34px]"
        />
        <span className="text-gray text-xs group-hover:text-main">
          {followers.follower.firstname || followers.follower.lastname
            ? `${followers.follower.firstname} ${followers.follower.lastname}`
            : followers.follower.nickname}
        </span>
      </Link>
      <div className="flex items-center gap-2">
        <form action={decline}>
          <button className="text-main text-xs py-1 px-2 bg-[#F0F7FF] rounded-md hover:text-white hover:bg-main duration-100">
            Decline
          </button>
        </form>
      </div>
    </div>
  );
};

export default WhoFollowItem;
