import Image from "next/image";
import { StoriesWithUser } from "./StoriesList";
import { StoryModal } from "@/components";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Trash } from "lucide-react";
import { deleteStory } from "@/lib/actions";
import toast from "react-hot-toast";

const Story = ({
  story,
  isStoriesPage,
  setStoriesList,
  storiesList,
}: {
  story: StoriesWithUser;
  isStoriesPage?: boolean;
  setStoriesList: (stories: StoriesWithUser[]) => void;
  storiesList: StoriesWithUser[];
}) => {
  const { user } = useUser();

  const deleteStoryFunc = async (storyId: number) => {
    try {
      await deleteStory(storyId);

      setStoriesList(storiesList.filter((story) => story.id !== storyId));
      toast.success("Story deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className={cn(
        "relative h-[210px] min-w-[115px] text-center cursor-pointer group/item",
        { "h-[410] min-w-[230px]": isStoriesPage }
      )}
    >
      <StoryModal story={story}>
        <Image
          src={story.img}
          alt="story"
          fill
          className="rounded-lg w-full object-cover"
        />
      </StoryModal>

      {user?.id === story.user.id && (
        <form action={() => deleteStoryFunc(story.id)}>
          <button>
            <Trash
              size={18}
              className="text-main absolute top-2 right-2 opacity-0 group-hover/item:opacity-100 duration-150"
            />
          </button>
        </form>
      )}

      <Link
        href={`/profile/${story.user.nickname}`}
        className={cn(
          "absolute bottom-[19px] left-[15px] right-[15px] grid gap-1 group hover:bg-main/10 rounded-lg duration-150",
          { "bg-gray/50 max-w-max mx-auto p-3": isStoriesPage }
        )}
      >
        <Image
          src={story.user.avatar || "/noAvatar.jpg"}
          width={40}
          height={40}
          alt="avatar"
          className="rounded-full h-10  justify-self-center stroke-main border border-main p-[2px] bg-white "
        />
        <h6
          className={"text-white text-[13px] font-normal group-hover:text-main"}
        >
          {story.user.firstname || story.user.nickname}
        </h6>
      </Link>
    </div>
  );
};

export default Story;
