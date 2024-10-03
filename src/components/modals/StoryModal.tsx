"use client";
import Image from "next/image";
import { StoriesWithUser } from "../RightSide/StoriesList";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { createdAt } from "@/lib/createdAt";
import { useState } from "react";

const StoryModal = ({
  story,
  children,
}: {
  story: StoriesWithUser;
  children: React.ReactNode;
}) => {
  const storyCreatedAt = createdAt(story.createdAt);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <p className="text-lg font-bold">
          {story.user.firstname ||
            (story.user.lastname &&
              `${story.user.firstname} ${story.user.lastname}`)}{" "}
          <span className="text-xs text-gray">@{story.user.nickname}</span>
        </p>
        <Image
          src={story.img}
          alt="story"
          width={500}
          height={410}
          className="rounded-lg object-cover"
        />
        <span className="text-xs text-gray block mt-2">{storyCreatedAt}</span>
      </DialogContent>
    </Dialog>
  );
};

export default StoryModal;
