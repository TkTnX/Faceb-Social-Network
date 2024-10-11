import { Stories } from "@/components";

const StoriesPage = () => {
    return <div className="max-w-[1317px] px-4 mx-auto">
        <h2 className="text-3xl font-bold text-main">Stories</h2>
        <Stories isStoriesPage={true} size="lg" />
  </div>;
}

export default StoriesPage