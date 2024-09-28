import { acceptFollowRequest, declineFollowRequest } from "@/lib/actions";
import { User } from "@prisma/client";
import { Check, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { WhoFollowType } from "./WhoFollowList";

const WhoFollowItem = ({
  sender,
  setFollowRequests,
}: {
  sender: User;
  setFollowRequests: (
    requests: (arr: WhoFollowType[]) => WhoFollowType[]
  ) => void;
}) => {
  const accept = async () => {
    try {
      await acceptFollowRequest(sender.id);

      setFollowRequests((prev) =>
        prev.filter((request) => request.sender.id !== sender.id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const decline = async () => {
    try {
      await declineFollowRequest(sender.id);

      setFollowRequests((prev) =>
        prev.filter((request) => request.sender.id !== sender.id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between last:border-0 border-b border-[#F1F2F6] py-3 first:pt-0">
      <Link className="flex items-center gap-4 group" href="/user/1">
        <Image
          src={sender.avatar || "/noAvatar.jpg"}
          width={34}
          height={34}
          alt={sender.nickname}
          className="rounded-full h-[34px] w-[34px]"
        />
        <span className="text-gray text-xs group-hover:text-main">
          {sender.firstname || sender.lastname
            ? `${sender.firstname} ${sender.lastname}`
            : sender.nickname}
        </span>
      </Link>
      <div className="flex items-center gap-2">
        <form action={accept}>
          <button className="text-main text-xs py-1 px-2 bg-[#F0F7FF] rounded-md hover:text-white hover:bg-main duration-100">
            <Check />
          </button>
        </form>
        <form action={decline}>
          <button className="text-main text-xs py-1 px-2 bg-[#F0F7FF] rounded-md hover:text-white hover:bg-main duration-100">
            <X />
          </button>
        </form>
      </div>
    </div>
  );
};

export default WhoFollowItem;
