"use client";
import { Story as StoryType, User } from "@prisma/client";
import Story from "./Story";
import { useOptimistic, useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import { addStory } from "@/lib/actions";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export type StoriesWithUser = StoryType & {
  user: User;
};

const StoriesList = ({
  stories,
  isStoriesPage,
  size,
}: {
  stories: StoriesWithUser[];
  isStoriesPage: boolean;
  size: "sm" | "lg";
}) => {
  const { user } = useUser();
  const [storiesList, setStoriesList] = useState(stories);
  const [img, setImg] = useState<any>(null);

  const [optimisticStories, addOptimisticStory] = useOptimistic(
    storiesList,
    (state, value: StoriesWithUser) => [value, ...state]
  );

  if (!user) return null;

  const addStoryFunc = async () => {
    addOptimisticStory({
      id: Math.random(),
      createdAt: new Date(),
      img,
      userId: user?.id || "",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      user: {
        avatar: user?.imageUrl || "/noAvatar.jpg",
        nickname: "Creating post...",
        firstname: user?.firstName || "Pending...",
        lastname: user?.lastName || "Pending...",
        id: String(Math.random()),
        createdAt: new Date(),
        updatedAt: new Date(),
        profileBg: null,
        description: null,
        city: null,
        school: null,
        work: null,
        website: null,
        birthday: null,
      },
    });
    try {
      const newPost = await addStory(img);

      if (newPost instanceof Error) {
        throw new Error(newPost.message);
      }
      setImg(null);

      setStoriesList((prev) => [newPost, ...prev]);

      toast.success("Story created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 w-full overflow-x-auto overflow-y-hidden   mt-4 scrollbar",
        { " sm:justify-center": size === "sm" }
      )}
    >
      <CldUploadWidget
        uploadPreset="social"
        onSuccess={(res: any) => setImg(res.info && res.info.secure_url)}
      >
        {({ open, widget }) => {
          return (
            <div className="flex flex-col gap-2">
              <div
                onClick={() => {
                  open();
                  widget?.open();
                }}
                className={cn(
                  " h-[210px] min-w-[115px] text-center cursor-pointer relative",
                  { "h-[410] min-w-[230px]": isStoriesPage }
                )}
              >
                {img ? (
                  <Image
                    src={img}
                    alt="story"
                    fill
                    className="rounded-lg h-full w-full object-cover opacity-80"
                  />
                ) : (
                  <>
                    <div className="rounded-lg h-full w-full object-cover bg-gray" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-3xl">
                      +
                    </span>
                  </>
                )}

                <div className="absolute bottom-[19px] left-[15px] right-[15px] grid gap-1 ">
                  <Image
                    src={user?.imageUrl || "/noAvatar.jpg"}
                    width={40}
                    height={40}
                    alt="avatar"
                    className="rounded-full h-10  justify-self-center stroke-main border border-main p-[2px] bg-white"
                  />
                  <h6 className="text-white text-[13px] font-normal">
                    Add a Story
                  </h6>
                </div>
              </div>
              {img && (
                <form action={addStoryFunc}>
                  <button className=" text-white text-xs bg-main p-2 rounded-md z-30 hover:opacity-80 duration-150">
                    Send
                  </button>
                </form>
              )}
            </div>
          );
        }}
      </CldUploadWidget>

      {optimisticStories.length > 0
        ? optimisticStories.map((story) => (
            <Story
              storiesList={storiesList}
              setStoriesList={setStoriesList}
              isStoriesPage={isStoriesPage}
              key={story.id}
              story={story}
            />
          ))
        : ""}
    </div>
  );
};

export default StoriesList;
