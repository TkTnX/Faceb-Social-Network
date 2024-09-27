import { Check, Gift, MoreHorizontal, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Birthdays = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h4 className="text-[#203758] text-lg font-medium">Birthdays</h4>
      </div>
      <div className="bg-white rounded-lg border border-[#F1F2F6] p-3 mt-4">
        <div className="flex items-center gap-1 justify-between last:border-0 border-b border-[#F1F2F6] py-3 first:pt-0">
          <Link
            className="flex items-start flex-col gap-1 group"
            href="/profile/1"
          >
            <Image
              src="https://i.pinimg.com/564x/67/dd/33/67dd333696cf3b13702f83e97e16167d.jpg"
              width={25}
              height={25}
              alt="avatar"
              className="rounded-full min-h-[25px] min-w[25px] h-[25px] w-[25px]"
            />
            <span className="text-gray text-xs group-hover:text-main">
              Thomas Ben
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <button className="text-main text-xs py-2 px-3 bg-[#F0F7FF] rounded-md hover:text-white hover:bg-main duration-100">
              Celebrate
            </button>
          </div>
        </div>
        {/* MORE BIRTHDAYS */}
        <Link
          href="#!"
          className="text-[9px] text-gray flex items-center gap-1 mt-4 bg-main/10 p-1 rounded-lg hover:bg-main/20 duration-100"
        >
          <Gift size={16} color="#1d9bf0" />
          <div>
            <p className="text-black">upcoming Birthdays</p>
            <p>See other 16 have upcoming birthdays</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Birthdays;
