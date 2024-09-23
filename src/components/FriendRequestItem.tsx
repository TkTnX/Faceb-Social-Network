import { Check, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FriendRequestItem = () => {
  return (
    <div className="flex items-center justify-between last:border-0 border-b border-[#F1F2F6] py-3 first:pt-0">
      <Link className="flex items-center gap-4 group" href="/user/1">
        <Image
          src="https://i.pinimg.com/564x/67/dd/33/67dd333696cf3b13702f83e97e16167d.jpg"
          width={34}
          height={34}
          alt="avatar"
          className="rounded-full h-[34px] w-[34px]"
        />
        <span className="text-gray text-xs group-hover:text-main">
          Thomas Ben
        </span>
      </Link>
      <div className="flex items-center gap-2">
        <button className="text-main text-xs bg-[#F0F7FF] rounded-md hover:text-white hover:bg-main duration-100">
          <Check />
        </button>
        <button className=" text-xs bg-[#F0F7FF] rounded-md hover:text-white hover:bg-main duration-100">
          <X />
        </button>
      </div>
    </div>
  );
};

export default FriendRequestItem;
