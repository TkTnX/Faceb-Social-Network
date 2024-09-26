"use server";
import { prisma } from "@/lib/client";
import { formatDate } from "@/lib/formatDate";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import {
  BriefcaseBusiness,
  Calendar,
  GraduationCap,
  Link as LinkIcon,
  MapPin,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";

const UserInformation = async ({ userId }: { userId: string }) => {
  const user = await prisma.user.findFirst({
    where: {
      id: String(userId),
    },
    include: {
      followers: true,
      following: true,
      blocked: true,
    },
  });
  if (!user) return null;
  const formattedDate = await formatDate(user.createdAt);
  const { userId: currentUserId } = auth();
 


  let isFollowed = false;
  let isBlocked = false;
  let isFollowing = false;

  if (currentUserId) {
    isFollowed = user.followers.some(
      (follower) => String(follower.id) === currentUserId
    );
    isBlocked = user.blocked.some(
      (blocked) => String(blocked.id) === currentUserId
    );
    isFollowing = user.following.some(
      (following) => String(following.id) === currentUserId
    );
  }

  return (
    <div className="mb-9">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h4 className="text-[#203758] text-lg font-medium">User Information</h4>
        <button>
          <MoreHorizontal />
        </button>
      </div>
      <div className=" rounded-lg bg-white border border-[#F1F2F6] py-4 px-6 mt-2">
        <div className="flex items-center text-sm gap-2">
          <h4 className="text-xl font-medium">
            {user.firstname && user.lastname
              ? `${user.firstname} ${user.lastname}`
              : user.nickname}
          </h4>
          <span className="text-gray">@{user.nickname}</span>
        </div>
        <p
          className={cn("text-sm text-gray", {
            "text-gray/50": !user.description,
          })}
        >
          {user.description ? user.description : "No description"}
        </p>
        <div className="grid gap-2 mt-4 text-sm">
          {user.city && (
            <div className="flex items-center gap-1 ">
              <MapPin color="#788292" size={18} />
              <span>
                Living in <b className="text-gray">{user.city}</b>
              </span>
            </div>
          )}
          {user.school && (
            <div className="flex items-center gap-1 ">
              <GraduationCap color="#788292" size={18} />
              <span>
                Went to <b className="text-gray">{user.school}</b>
              </span>
            </div>
          )}
          {user.work && (
            <div className="flex items-center gap-1 ">
              <BriefcaseBusiness color="#788292" size={18} />
              <span>
                Works at <b className="text-gray">{user.work}</b>
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between flex-wrap gap-1 mt-4">
          {user.website && (
            <div className="flex items-center gap-2">
              <LinkIcon size={14} color="#788292" />
              <Link
                className="text-main text-xs font-medium"
                href={user.website}
              >
                {user.website}
              </Link>
            </div>
          )}
          <div className="text-xs text-gray flex items-center gap-1">
            <Calendar size={12} />
            <span>Joined {formattedDate}</span>
          </div>
        </div>
        {currentUserId !== user.id && (
          <>
            <button className="text-main bg-main/20 w-full mt-2 py-3 rounded-lg hover:bg-main hover:text-white duration-100">
              {isFollowed ? "Unfollow" : isFollowing ? "Following..." : "Follow"}
            </button>
            <button className="text-red-400 text-right w-full mt-2 text-xs">
              {isBlocked ? "Unblock user" : "Block user"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserInformation;
