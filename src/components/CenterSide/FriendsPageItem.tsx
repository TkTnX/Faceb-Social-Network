"use client";
import { switchFollow } from "@/lib/actions";
import { Follower, User } from "@prisma/client";
import { UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";


const FriendsPageItem = ({
  user,
  isFriends = false,
}: {
  user: User;
  isFriends?: boolean;
}) => {
  const [isFriend, setIsFriend] = useState(false);

  const follow = async () => {
    try {
      await switchFollow(user.id);

      setIsFriend(!isFriend);

      toast.success(`${isFriend ? "Unfollowed" : "Followed"} successfully`);
    } catch (error) {
      console.log(error);
      toast.success("Something went wrong");
    }
  };
  return (
    <div className="max-w-max">
      <Link href={`/profile/${user.nickname}`}>
        <Image
          src={user.avatar || "/noAvatar.jpg"}
          alt="avatar"
          className="rounded-md"
          width={160}
          height={160}
        />
      </Link>
      <div className="mt-2 flex items-center justify-between">
        <h4 className="text-main font-bold text-xs">
          {user.firstname || user.lastname
            ? `${user.firstname} ${user.lastname}`
            : user.nickname}
        </h4>
        {!isFriends && (
          <form action={follow}>
            <button>
              <UserPlus
                size={18}
                className="text-main hover:text-main/90 duration-150"
              />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FriendsPageItem;
