import { Pen } from "lucide-react";
import EditPost from "../modals/EditPost";

const PostMoreEdit = ({ postId, desc }: { postId: number; desc: string }) => {
  return (
    <div>
      <EditPost desc={desc} postId={postId}>
        <button
          type="button"
          className="flex items-center gap-2 text-yellow-500 hover:bg-main/20 p-2 rounded-lg hover:text-main duration-100 group"
        >
          <Pen /> <span className="text-gray group-hover:text-main">Edit</span>
        </button>
      </EditPost>
    </div>
  );
};

export default PostMoreEdit;
