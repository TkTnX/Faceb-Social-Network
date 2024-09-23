import { MoreHorizontal } from "lucide-react";
import Story from "./Story";

const Stories = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h4 className="text-[#203758] text-lg font-medium">Stories</h4>
        <button>
          <MoreHorizontal />
        </button>
      </div>
      <div className="flex items-center gap-2 w-full overflow-x-auto scroll-hidden mt-4">
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
      </div>
    </div>
  );
};

export default Stories;