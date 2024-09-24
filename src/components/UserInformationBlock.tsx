import {
  BriefcaseBusiness,
  Calendar,
  GraduationCap,
  Link as LinkIcon,
  MapPin,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";

const UserInformation = () => {
  return (
    <div className="mb-9">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h4 className="text-[#203758] text-lg font-medium">User Information</h4>
        <button>
          <MoreHorizontal />
        </button>
      </div>
      <div className=" rounded-lg bg-white border border-[#F1F2F6] py-4 px-6 mt-2">
        <div className="flex items-center text-sm gap-2">
          <h4 className="text-xl font-medium">Timur Galiakbarov</h4>
          <span className="text-gray">@ttx</span>
        </div>
        <p className="text-sm text-gray">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
          temporibus aperiam nemo architecto illo nihil dolorem dolorum
          laboriosam ipsam beatae, consequatur dicta quos minus excepturi?
        </p>
        <div className="grid gap-2 mt-4 text-sm">
          <div className="flex items-center gap-1 ">
            <MapPin color="#788292" size={18} />
            <span>
              Living in <b className="text-gray">Yekaterinburg</b>
            </span>
          </div>
          <div className="flex items-center gap-1 ">
            <GraduationCap color="#788292" size={18} />
            <span>
              Went to <b className="text-gray">RZD Lyceum №3</b>
            </span>
          </div>
          <div className="flex items-center gap-1 ">
            <BriefcaseBusiness color="#788292" size={18} />
            <span>
              Works at <b className="text-gray">Yandex</b>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-1 mt-4">
          <div className="flex items-center gap-2">
            <LinkIcon size={14} color="#788292" />
            <Link
              className="text-main text-xs font-medium"
              href="timurgaliakbarov.vercel.app"
            >
              timurgaliakbarov.vercel.app
            </Link>
          </div>
          <div className="text-xs text-gray flex items-center gap-1">
            <Calendar size={12} />
            <span>Joined March 2024</span>
          </div>
        </div>
        <button className="text-main bg-main/20 w-full mt-2 py-3 rounded-lg hover:bg-main hover:text-white duration-100">
          Follow
        </button>
      </div>
    </div>
  );
};

export default UserInformation;
