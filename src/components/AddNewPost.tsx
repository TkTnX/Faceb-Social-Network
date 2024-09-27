import { User } from "@prisma/client";
import { Calendar, ImageIcon, PenToolIcon, VideoIcon } from "lucide-react";
import Image from "next/image";

const AddNewPost = ({user}: {user?: User}) => {
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden p-4">
      <div className="flex items-start gap-3 pb-3">
        <Image
          src={user?.avatar || "/noAvatar.jpg"}
          width={40}
          height={40}
          alt={user?.nickname || "no avatar"}
          className="rounded-full h-10"
        />
        <textarea
          placeholder={`What's on you mind, ${user?.firstname || user?.nickname}?`}
          className="w-full bg-gray/5 rounded-lg p-2  outline-none min-h-[55px] max-h-48 overflow-hidden"
        />
      </div>
      <div className="flex items-center gap-5 border-t  border-gray/20 pt-3 flex-wrap">
        <button className="flex items-center gap-1 text-gray text-sm hover:text-main duration-200">
          <ImageIcon size={20} color="#1d9bf0" />
          <span>Photo</span>
        </button>
        <button className="flex items-center gap-1 text-gray text-sm hover:text-main duration-200">
          <VideoIcon size={22} color="#1d9bf0" />
          <span>Photo</span>
        </button>
        <button className="flex items-center gap-1 text-gray text-sm hover:text-main duration-200">
          <Calendar size={22} color="#1d9bf0" />
          <span>Event</span>
        </button>
        <button className="flex items-center gap-1 text-gray text-sm hover:text-main duration-200">
          <PenToolIcon size={22} color="#1d9bf0" />
          <span>Poll</span>
        </button>
      </div>
    </div>
  );
};

export default AddNewPost;
