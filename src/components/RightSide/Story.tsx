import Image from "next/image";
import { StoriesWithUser } from "./StoriesList";
import { StoryModal } from "@/components";
import Link from "next/link";

const Story = ({ story }: { story: StoriesWithUser }) => {
  return (
    <div className="relative h-[210px] min-w-[115px] text-center cursor-pointer">
      <StoryModal story={story}>
        <Image
          src={story.img}
          alt="story"
          fill
          className="rounded-lg w-full object-cover"
        />
      </StoryModal>

      <Link href={`/profile/${story.user.nickname}`} className="absolute bottom-[19px] left-[15px] right-[15px] grid gap-1 group hover:bg-main/10 rounded-lg duration-150">
        <Image
          src={story.user.avatar || "/noAvatar.jpg"}
          width={40}
          height={40}
          alt="avatar"
          className="rounded-full h-10  justify-self-center stroke-main border border-main p-[2px] bg-white "
        />
        <h6 className="text-white text-[13px] font-normal group-hover:text-main">
          {story.user.firstname || story.user.nickname}
        </h6>
      </Link>
    </div>
  );
};

export default Story;
