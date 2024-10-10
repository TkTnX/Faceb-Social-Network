"use client";
import { MoreHorizontal, Pen, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { deletePost } from "@/lib/actions";
import PostMoreDelete from "./PostMoreDelete";
import PostMoreEdit from "./PostMoreEdit";
import toast from "react-hot-toast";

const PostMore = ({
  postId,
  isPostPage,
  desc,
  reloadPosts,
}: {
  postId: number;
  isPostPage?: boolean;
  desc: string;
  reloadPosts?: () => void;
}) => {
  const deletePostFunc = async () => {
    try {
      await deletePost(postId);
      reloadPosts && reloadPosts()
      toast.success("Post deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (isPostPage) {
    return (
      <div className="flex items-center gap-5">
        <PostMoreEdit reloadPosts={reloadPosts} desc={desc} postId={postId} />
        <form action={deletePostFunc}>
          <PostMoreDelete />
        </form>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <MoreHorizontal size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"p-2"}>
        <PostMoreEdit reloadPosts={reloadPosts} desc={desc} postId={postId} />
        <form action={deletePostFunc}>
          <PostMoreDelete />
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostMore;
