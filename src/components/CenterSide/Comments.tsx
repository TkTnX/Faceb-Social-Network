"use client";
import Image from "next/image";
import { Input } from "../ui/input";
import { useOptimistic, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import CommentItem, { CommentType } from "./CommentItem";
import { useUser } from "@clerk/nextjs";
import { addComment, deleteComments } from "@/lib/actions";
import toast from "react-hot-toast";

const Comments = ({
  postId,
  comments,
  setCommentsLength,
  commentsLength,
}: {
  postId: number;
  comments: CommentType[];
  setCommentsLength: (value: number) => void;
  commentsLength: number;
}) => {
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [commentsList, setCommentsList] = useState(comments);
  const [optimisticComments, changeOptimisticComments] = useOptimistic(
    commentsList,
    (state, value: "add" | number) =>
      value === "add"
        ? [
            {
              id: Math.random(),
              content,
              createdAt: new Date(),
              user: {
                avatar: user?.imageUrl || "/noAvatar.jpg",
                nickname: "Pending...",
                firstname: "Pending...",
                lastname: "Pending...",
                id: String(Math.random()),
            },
              likes: [],
              userId: user?.id || "",
              updatedAt: new Date(),
              postId,
            },
            ...state,
          ]
        : [...state.filter((comment) => comment.id !== value)]
  );
  if (!user) return null;

  const addNewComment = async () => {
    changeOptimisticComments("add");
    setCommentsLength(commentsLength + 1);
    try {
      const newComment = (await addComment(postId, content)) as CommentType;
      setContent("")
      if (newComment) {
        setCommentsList([newComment, ...commentsList]);
      }
      toast.success("Comment added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const deleteCommentFunc = async (commentId: number) => {
    changeOptimisticComments(commentId);
    setCommentsLength(commentsLength - 1);

    try {
      await deleteComments(commentId, postId);

      setCommentsList(
        commentsList.filter((comment) => comment.id !== commentId)
      );
      toast.success("Comment deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };


  return (
    <div className="mt-2 border-t border-t-gray/20 pt-3">
      <div className="flex items-center gap-2 w-full">
        <Image
          src={user.imageUrl || "/noAvatar.jpg"}
          width={40}
          height={40}
          alt="avatar"
          className="rounded-full"
        />
        <form
          action={() => {
            addNewComment();
            setContent("");
          }}
          className="flex-1 flex items-center gap-1"
        >
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a comment"
          />
          <button
            className={cn(
              "text-white p-2 rounded-lg bg-main hover:bg-main/90 duration-100",
              {
                "bg-gray/50 text-black/50 cursor-not-allowed hover:bg-gray/50":
                  content.length === 0,
              }
            )}
          >
            Send
          </button>
        </form>
      </div>
      <div className="grid gap-4 p-3">
        {/* COMMENTS  LIST */}

        {/* COMMENT */}
        {optimisticComments.length > 0 ? (
          optimisticComments.map((comment) => (
            <CommentItem
              setContent={setContent}
              deleteCommentFunc={deleteCommentFunc}
              userId={user.id}
              comment={comment}
              key={comment.id}
            />
          ))
        ) : (
          <span className="text-gray opacity-80 text-center block">
            No comments yet. <br /> Your comment will be first!
          </span>
        )}
      </div>
    </div>
  );
};

export default Comments;
