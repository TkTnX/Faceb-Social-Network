"use client";

import { FeedPostType } from "@/components/CenterSide/Post";
import { Block } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function usePosts(
  type: string,
  userId?: string,
  isUserBlocked?: Block | null,
  isCurrentUserBlocked?: Block | null
) {
  const [posts, setPosts] = useState<FeedPostType[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`;
  const fetchPosts = async (newSkip: number) => {
    setLoading(true);

    const urlWithParams = `${url}?userId=${userId}&type=${type}&skip=${newSkip}&isUserBlocked=${
      isUserBlocked ? "true" : "false"
    }&isCurrentUserBlocked=${isCurrentUserBlocked ? "true" : "false"}`;

    try {
      const newPosts = await (await axios.get(urlWithParams)).data;

      if (newPosts.length < 1) {
        setHasMore(false);
      }

      setPosts((prevPosts) => [
        ...prevPosts,
        ...newPosts.filter(
          (post: FeedPostType) =>
            !prevPosts.some((prevPost) => prevPost.id === post.id)
        ),
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = async () => {
    const newSkip = skip + 5;
    setSkip(newSkip);
    fetchPosts(newSkip);
  };

  const reloadPosts = async () => {
    setPosts([]);
    setSkip(0);
    setHasMore(true);
    fetchPosts(0);
    setLoading(true);

    const urlWithParams = `${url}?userId=${userId}&type=${type}&skip=0&isUserBlocked=${
      isUserBlocked ? "true" : "false"
    }&isCurrentUserBlocked=${isCurrentUserBlocked ? "true" : "false"}`;

    try {
      const newPosts = await (await axios.get(urlWithParams)).data;

      if (newPosts.length < 1) {
        setHasMore(false);
      }

      setPosts((prevPosts) => [
        ...prevPosts,
        ...newPosts.filter(
          (post: FeedPostType) =>
            !prevPosts.some((prevPost) => prevPost.id === post.id)
        ),
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    loading,
    hasMore,
    handleLoadMore,
    setPosts,
    fetchPosts,
    reloadPosts,
  };
}
