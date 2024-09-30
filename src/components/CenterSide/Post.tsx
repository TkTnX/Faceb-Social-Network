import { Post as PostType, User } from "@prisma/client";
import {
  MessageSquareMore,
  MoreHorizontal,
  Share2Icon,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";

export type FeedPostType = PostType & {
  user: User;
  likes: { userId: string }[];
  _count: { comments: number };
};

const Post = ({ post, currentUser }: { post: FeedPostType, currentUser: string }) => {
  return (
    <div className="py-5 px-4 sm:px-8 bg-white rounded-lg border border-[#F1F2F6] ">
      {/* TOP */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-5">
          <Image
            src={post.user.avatar || "/noAvatar.jpg"}
            width={40}
            height={40}
            alt="avatar"
            className="rounded-full h-10"
          />
          <div>
            <h5 className="text-[#203758]">
              {post.user.firstname || post.user.lastname
                ? `${post.user.firstname} ${post.user.lastname}`
                : post.user.nickname}
            </h5>
            <p className="text-gray font-normal text-xs">45 mins ago</p>
          </div>
        </div>
        {
          currentUser === post.user.id && (
            <button>
              <MoreHorizontal size={18} />
            </button>
          )
        }
     
      </div>
      <p className="text-sm font-normal text-[#203758] mt-3">{post.desc}</p>
      <div className="w-full mt-4 min-h-72 relative ">
        <Image
          src={post.img}
          fill
          alt="post image"
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex items-center justify-end mt-4 gap-2">
        <button className="flex items-start gap-1 group">
          <ThumbsUp
            color="#788292"
            width={24}
            className="group-hover:stroke-main"
          />
          <span className="text-gray text-xs group-hover:text-main">
            {post.likes.length}
          </span>
        </button>
        <button className="flex items-start gap-1 group">
          <MessageSquareMore
            color="#788292"
            width={24}
            className="group-hover:stroke-main"
          />
          <span className="text-gray text-xs group-hover:text-main">
            {post._count.comments}
          </span>
        </button>
        <button className="flex items-start gap-1 group">
          <Share2Icon
            color="#788292"
            width={24}
            className="group-hover:stroke-main"
          />
        </button>
      </div>
    </div>
  );
};

export default Post;
