import {
  MessageSquareMore,
  MoreHorizontal,
  Share2Icon,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";

const Post = () => {
  return (
    <div className="py-5 px-4 sm:px-8 bg-white rounded-lg border border-[#F1F2F6] ">
      {/* TOP */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-5">
          <Image
            src="https://i.pinimg.com/564x/67/dd/33/67dd333696cf3b13702f83e97e16167d.jpg"
            width={40}
            height={40}
            alt="avatar"
            className="rounded-full h-10"
          />
          <div>
            <h5 className="text-[#203758]">Thomas Ben</h5>
            <p className="text-gray font-normal text-xs">45 mins ago</p>
          </div>
        </div>
        <button>
          <MoreHorizontal size={18} />
        </button>
      </div>
      <p className="text-sm font-normal text-[#203758] mt-3">
        Being a father is sometimes my hardest but always my most rewarding job.
        Happy Fathers Day to all dads out there.
      </p>
      <div className="w-full mt-4 min-h-72 relative ">
        <Image
          src="https://i.pinimg.com/564x/5a/9b/a0/5a9ba09d6f614fd979dc7e64a3baa7ad.jpg"
          fill
          alt="post image"
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex items-center justify-end mt-4 gap-2">
        <button className="flex items-start gap-1 group">
          <ThumbsUp
            color="#788292"
            width={24}
            className="group-hover:stroke-main"
          />
          <span className="text-gray text-xs group-hover:text-main">12</span>
        </button>
        <button className="flex items-start gap-1 group">
          <MessageSquareMore
            color="#788292"
            width={24}
            className="group-hover:stroke-main"
          />
          <span className="text-gray text-xs group-hover:text-main">5</span>
        </button>
        <button className="flex items-start gap-1 group">
          <Share2Icon
            color="#788292"
            width={24}
            className="group-hover:stroke-main"
          />
          <span className="text-gray text-xs group-hover:text-main">2</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
