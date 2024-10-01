import { createdAt } from "@/lib/createdAt";
import { Post as PostType, User } from "@prisma/client";
import Image from "next/image";
import PostMore from "./PostMore";
import PostInteraction from "./PostInteraction";
import Comments from "./Comments";

export type FeedPostType = PostType & {
  user: User;
  likes: { userId: string }[];
  _count: { comments: number };
};

const Post = ({
  post,
  currentUser,
}: {
  post: FeedPostType;
  currentUser: string;
}) => {
  const postCreatedAt = createdAt(post.createdAt);
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
            <p className="text-gray font-normal text-xs">{postCreatedAt}</p>
          </div>
        </div>
        {currentUser === post.user.id && <PostMore />}
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
      <PostInteraction
        likes={post.likes.map((like) => like.userId)}
        comments={post._count.comments}
        postId={post.id}
      />
      
    </div>
  );
};

export default Post;
