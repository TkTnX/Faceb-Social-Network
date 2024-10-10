"use client";
import Post from "./Post";
import { Block, User } from "@prisma/client";
import usePosts from "@/hooks/usePosts";
import { Skeleton } from "../ui/skeleton";
import AddNewPost from "./AddNewPost";
const Feed = ({
  user,
  type,
  isUserBlocked,
  isCurrentUserBlocked,
}: {
  user?: User;
  type: string;
  isUserBlocked?: Block | null;
  isCurrentUserBlocked?: Block | null;
}) => {
  const { posts, loading, hasMore, handleLoadMore, reloadPosts } = usePosts(
    type,
    user?.id ?? "",
    isUserBlocked,
    isCurrentUserBlocked
  );

  const reloadPostsFunc = async () => {
    await reloadPosts();
  };

  return (
    <>
      {type === "home" && (
        <AddNewPost reloadPosts={reloadPostsFunc} user={user} />
      )}
      <div className="grid gap-3 mt-3">
        {posts.length === 0 && !loading && (
          <span className="text-center text-gray block mt-5">No posts yet</span>
        )}
        {posts.length === 0 ? (
          <div className="grid gap-3 mt-3 ">
            {[...new Array(5)].map((_, index) => (
              <Skeleton
                key={index}
                className="w-[639px] h-[512px] bg-gray/30"
              />
            ))}
          </div>
        ) : (
          posts.map((post) => (
            <Post reloadPosts={reloadPostsFunc} key={post.id} post={post} />
          ))
        )}
        {hasMore && type !== "profile" && (
          <button
            className="text-main font-bold hover:bg-main/20 p-2 rounded-lg text-center w-full duration-150 mb-10"
            onClick={handleLoadMore}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        )}
        {!hasMore && (
          <span className="text-center text-gray block mt-5">
            No more posts
          </span>
        )}
      </div>
    </>
  );
};

export default Feed;
