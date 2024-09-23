import { MoreHorizontal } from "lucide-react";
import { WhoFollowItem } from ".";

const WhoFollow = () => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h4 className="text-[#203758] text-lg font-medium">Who to Follow</h4>
        <button>
          <MoreHorizontal />
        </button>
      </div>
      <div className="mt-4 rounded-lg bg-white border border-[#F1F2F6] py-4 px-6">
        <WhoFollowItem />
        <WhoFollowItem />
        <WhoFollowItem />
        <WhoFollowItem />
        <WhoFollowItem />
        <WhoFollowItem />
      </div>
    </div>
  );
};

export default WhoFollow;
