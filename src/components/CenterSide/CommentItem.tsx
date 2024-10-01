import { deleteComments } from "@/lib/actions";
import { Comment } from "@prisma/client";
import { Trash } from "lucide-react";
import Image from "next/image";

export type CommentType = Comment & {
  user: {
    avatar: string | null;
    nickname: string;
    firstname: string;
    lastname: string;
    id: string;
  };
};

const CommentItem = ({
  comment,
  userId,
  deleteCommentFunc,
}: {
  comment: CommentType;
  userId: string;
  deleteCommentFunc: (commentId: number) => void
}) => {
  return (
    <div className="flex items-start gap-1 border-b-gray/10 border-b pb-2 mt-2">
      <Image
        src={comment.user.avatar || "/noAvatar.jpg"}
        width={28}
        height={28}
        alt="avatar"
        className="rounded-full"
      />
      <p className="text-gray text-sm">{comment.content}</p>
      {userId === comment.userId && (
        <form className="ml-auto" action={() => deleteCommentFunc(comment.id)}>
          <button className="text-gray ml-auto hover:text-main duration-200">
            <Trash size={18} />
          </button>
        </form>
      )}
    </div>
  );
};

export default CommentItem;
