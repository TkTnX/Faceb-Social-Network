"use client";
import Image from "next/image";
import { Input } from "../ui/input";
import { useOptimistic, useState } from "react";
import { cn } from "@/lib/utils";
import CommentItem, { CommentType } from "./CommentItem";
import { useUser } from "@clerk/nextjs";
import { addComment, deleteComments } from "@/lib/actions";

const Comments = ({
  postId,
  comments,
}: {
  postId: number;
  comments: CommentType[];
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
    try {
      const newComment = (await addComment(postId, content)) as CommentType;
      if (newComment) {
        setCommentsList([newComment, ...commentsList]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCommentFunc = async (commentId: number) => {
    changeOptimisticComments(commentId);
    try {
      await deleteComments(commentId, postId);

      setCommentsList(
        commentsList.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.log(error);
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
