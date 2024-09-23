import Image from "next/image";
import Link from "next/link";

const WhoFollowItem = () => {
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
      <button className="text-main text-xs py-2 px-3 bg-[#F0F7FF] rounded-md hover:text-white hover:bg-main duration-100">
        Follow
      </button>
    </div>
  );
};

export default WhoFollowItem;
