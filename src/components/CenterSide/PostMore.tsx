import { MoreHorizontal, Pen, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";

const PostMore = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <MoreHorizontal size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2">
        <button className="flex items-center gap-2 text-yellow-500 hover:bg-main/20 p-2 rounded-lg hover:text-main duration-100 group">
          <Pen /> <span className="text-gray group-hover:text-main">Edit</span>
        </button>
        <button className="flex items-center gap-2 text-red-500 hover:bg-main/20 p-2 rounded-lg hover:text-main duration-100 group">
          <X /> <span className="text-gray group-hover:text-main">Delete</span>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PostMore