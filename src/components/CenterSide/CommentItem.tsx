"use client";
import { addCommentLike, editComment } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Comment } from "@prisma/client";
import { Pen, ReplyIcon, ThumbsUp, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useOptimistic, useState } from "react";
import toast from "react-hot-toast";
import { Input } from "../ui/input";

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
  setContent,
}: {
  comment: CommentType;
  userId: string;
  deleteCommentFunc: (commentId: number) => void;
  setContent: (v: string) => void;
}) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [newContent, setNewContent] = useState(comment.content);
  const [likesInfo, setLikesInfo] = useState({
    isLiked:
      comment && comment.likes
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

  const edit = async () => {
    try {
      await editComment(newContent, comment.id);
      toast.success("Comment edited successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setOpenEdit(false);

    }
  };

  return (
    <div className="flex items-start gap-1 border-b-gray/10 border-b pb-2 mt-2 flex-wrap">
      <Link href={`/profile/${comment.user.nickname}`}>
        <Image
          src={comment.user.avatar || "/noAvatar.jpg"}
          width={28}
          height={28}
          alt="avatar"
          className="rounded-full"
        />
      </Link>
      {openEdit ? (
        <form action={edit} className="flex items-center gap-2 w-1/2">
          <Input
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            name="content"
            placeholder={comment.content}
          />
          <button className="text-white hover:text-main duration-200 bg-main px-2 py-1 rounded-md hover:bg-main/50">
            Edit
          </button>
        </form>
      ) : (
        <p className="text-gray text-sm break-all">
          {newContent !== comment.content ? newContent : comment.content}
        </p>
      )}
      <div className="flex items-baseline gap-2 ml-auto ">
        {userId === comment.userId && (
          <>
            <form action={() => deleteCommentFunc(comment.id)}>
              <button className="text-gray hover:text-main duration-200">
                <Trash size={18} />
              </button>
            </form>
            <button
              onClick={() => setOpenEdit(!openEdit)}
              className="text-gray hover:text-main duration-200"
            >
              <Pen size={18} />
            </button>
          </>
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
        <button onClick={() => setContent(`@${comment.user.nickname}, `)}>
          <ReplyIcon
            size={18}
            color="#788292"
            className="hover:stroke-main duration-150"
          />
        </button>
      </div>
    </div>
  );
};

export default CommentItem;
