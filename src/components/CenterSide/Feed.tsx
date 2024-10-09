"use client";
import Post from "./Post";
import { Block } from "@prisma/client";
import usePosts from "@/hooks/usePosts";
import { Skeleton } from "../ui/skeleton";
const Feed = ({
  userId,
  type,
  isUserBlocked,
  isCurrentUserBlocked,
}: {
  userId?: string;
  type: string;
  isUserBlocked?: Block | null;
  isCurrentUserBlocked?: Block | null;
}) => {
  const { posts, loading, hasMore, handleLoadMore } = usePosts(
    type,
    userId ?? "",
    isUserBlocked,
    isCurrentUserBlocked
  );

  if (posts.length === 0 && !loading)
    return (
      <span className="text-center text-gray block mt-5">No posts yet</span>
    );

  if (posts.length === 0)
    return (
      <div className="grid gap-3 mt-3 ">
        {[...new Array(5)].map((_, index) => (
          <Skeleton key={index} className="w-[639px] h-[512px] bg-gray/30" />
        ))}
      </div>
    );

  return (
    <div className="grid gap-3 mt-3">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {hasMore && type !== "profile" && (
        <button
          className="text-main font-bold hover:bg-main/20 p-2 rounded-lg text-center w-full duration-150 mb-10"
          onClick={handleLoadMore}
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
      {!hasMore && (
        <span className="text-center text-gray block mt-5">No more posts</span>
      )}
    </div>
  );
};

export default Feed;
