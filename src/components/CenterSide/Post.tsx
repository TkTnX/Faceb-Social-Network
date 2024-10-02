import { createdAt } from "@/lib/createdAt";
import { Post as PostType, User, Comment } from "@prisma/client";
import Image from "next/image";
import PostMore from "./PostMore";
import PostInteraction from "./PostInteraction";
import Link from "next/link";

type CommentsType = Comment & {
  user: {
    id: string;
    nickname: string;
    firstname: string;
    lastname: string;
    avatar: string | null;
  };
};

export type FeedPostType = PostType & {
  user: User;
  likes: { userId: string }[];
  _count: { comments: number };
  comments: CommentsType[];
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
        <Link
          href={`/profile/${post.user.nickname}`}
          className="flex items-center gap-5 group duration-150"
        >
          <Image
            src={post.user.avatar || "/noAvatar.jpg"}
            width={40}
            height={40}
            alt="avatar"
            className="rounded-full h-10"
          />
          <div>
            <h5 className="text-[#203758] group-hover:text-main">
              {post.user.firstname || post.user.lastname
                ? `${post.user.firstname} ${post.user.lastname}`
                : post.user.nickname}
            </h5>
            <p className="text-gray font-normal text-xs">{postCreatedAt}</p>
          </div>
        </Link>
        {currentUser === post.user.id && <PostMore postId={post.id} />}
      </div>
      <p className="text-sm font-normal text-[#203758] mt-3">{post.desc}</p>
      {post.img && (
        <div className="w-full mt-4 min-h-72 relative ">
          <Image
            src={post.img}
            fill
            alt="post image"
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <PostInteraction
        likes={post.likes.map((like) => like.userId)}
        comments={post.comments}
        postId={post.id}
      />
    </div>
  );
};

export default Post;
