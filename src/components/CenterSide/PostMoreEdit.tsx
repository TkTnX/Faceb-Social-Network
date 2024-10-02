import { Pen } from "lucide-react";
import EditPost from "../modals/EditPost";

const PostMoreEdit = ({postId}: {postId: number}) => {
  return (
    <div>
      <EditPost postId={postId}>
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
