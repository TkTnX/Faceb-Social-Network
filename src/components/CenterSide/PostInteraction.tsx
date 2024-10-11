"use client";
import { changeLike } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { MessageSquareMore, Share2Icon, ThumbsUp } from "lucide-react";
import { useEffect, useOptimistic, useState } from "react";
import { Comments } from "@/components";
import { CommentType } from "./CommentItem";
import toast from "react-hot-toast";
const PostInteraction = ({
  postId,
  comments,
  likes,
  isPostPage,
}: {
  postId: number;
  comments: CommentType[];
  likes: string[];
  isPostPage?: boolean;
}) => {
  const { userId } = useAuth();
  const [openComments, setOpenComments] = useState(false);
  const [commentsLength, setCommentsLength] = useState(comments.length);
  const [like, setLike] = useState({
    isLiked: likes.includes(String(userId)),
    likes: likes.length,
  });

  useEffect(() => {
    if (isPostPage) {
      setOpenComments(true);
    }
  }, [isPostPage]);

  const likeFunc = async () => {
    switchOptimisticLike("");
    try {
      await changeLike(postId);

      setLike({
        isLiked: !like.isLiked,
        likes: like.isLiked ? like.likes - 1 : like.likes + 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    like,
    (state, value) => ({
      isLiked: !state.isLiked,
      likes: state.isLiked ? state.likes - 1 : state.likes + 1,
    })
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post/${postId}`
    );
    toast.success("Link copied to clipboard");
}

  return (
    <>
      <div className="flex items-center justify-end mt-4 gap-2">
        <form action={likeFunc}>
          <button className="flex items-start gap-1 group">
            <ThumbsUp
              color="#788292"
              width={24}
              className={cn("group-hover:stroke-main", {
                "fill-main stroke-main": optimisticLike.isLiked,
              })}
            />
            <span className="text-gray text-xs group-hover:text-main">
              {optimisticLike.likes}
            </span>
          </button>
        </form>
        {!isPostPage && (
          <button
            onClick={() => setOpenComments((prev) => !prev)}
            className="flex items-start gap-1 group"
          >
            <MessageSquareMore
              color="#788292"
              width={24}
              className="group-hover:stroke-main"
            />
            <span className="text-gray text-xs group-hover:text-main">
              {commentsLength}
            </span>
          </button>
        )}
        <button onClick={handleCopy} className="flex items-start gap-1 group">
          <Share2Icon
            color="#788292"
            width={24}
            className="group-hover:stroke-main"
          />
        </button>
      </div>
      {openComments && (
        <Comments
          commentsLength={commentsLength}
          setCommentsLength={setCommentsLength}
          comments={comments}
          postId={postId}
        />
      )}
    </>
  );
};

export default PostInteraction;
