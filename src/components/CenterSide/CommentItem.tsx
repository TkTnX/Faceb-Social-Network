"use client";
import { addCommentLike } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Comment } from "@prisma/client";
import { ThumbsUp, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useOptimistic, useState } from "react";
import toast from "react-hot-toast";

export type CommentType = Comment & {
  user: {
    avatar: string | null;
    nickname: string;
    firstname: string;
    lastname: string;
    id: string;
  };
  likes: { id: number; userId: string }[];
};

const CommentItem = ({
  comment,
  userId,
  deleteCommentFunc,
}: {
  comment: CommentType;
  userId: string;
  deleteCommentFunc: (commentId: number) => void;
}) => {
  const [likesInfo, setLikesInfo] = useState({
    isLiked: comment && comment.likes
      ? comment.likes.some((like) => like.userId === userId)
      : false,
    likesLength: comment && comment.likes ? comment.likes.length : 0,
  });
  const like = async () => {
    changeOptimisticLike("");
    try {
      await addCommentLike(comment.id);

      setLikesInfo({
        isLiked: !likesInfo.isLiked,
        likesLength: likesInfo.isLiked
          ? likesInfo.likesLength - 1
          : likesInfo.likesLength + 1,
      });

      toast.success(
        `Comment ${likesInfo.isLiked ? "unliked" : "liked"} successfully`
      );
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const [optimisticLike, changeOptimisticLike] = useOptimistic(
    likesInfo,
    (state) => ({
      isLiked: !state.isLiked,
      likesLength: state.isLiked
        ? state.likesLength - 1
        : state.likesLength + 1,
    })
  );

  return (
    <div className="flex items-start gap-1 border-b-gray/10 border-b pb-2 mt-2">
      <Link href={`/profile/${comment.user.nickname}`}>
        <Image
          src={comment.user.avatar || "/noAvatar.jpg"}
          width={28}
          height={28}
          alt="avatar"
          className="rounded-full"
        />
      </Link>
      <p className="text-gray text-sm">{comment.content}</p>
      <div className="flex items-baseline gap-2 ml-auto">
        {userId === comment.userId && (
          <form action={() => deleteCommentFunc(comment.id)}>
            <button className="text-gray hover:text-main duration-200">
              <Trash size={18} />
            </button>
          </form>
        )}
        <form action={like}>
          <button className="flex items-end group">
            <ThumbsUp
              size={18}
              color="#788292"
              className={cn("group-hover:stroke-main duration-150", {
                "fill-main stroke-main": optimisticLike.isLiked,
              })}
            />
            <span
              className={cn("text-xs text-gray", {
                "text-main": optimisticLike.isLiked,
              })}
            >
              {optimisticLike.likesLength}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentItem;
