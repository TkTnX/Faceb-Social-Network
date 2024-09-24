import { CenterSide, LeftSide, RightSide } from "@/components";

const Homepage = () => {
  return (
    <div className="flex items-start gap-3 lg:gap-7 justify-between max-w-[1317px] px-4 mx-auto">
      {/* LEFT */}
      <LeftSide userId="test" />
      {/* CENTER */}
      <CenterSide type="home" />
      {/* RIGHT */}
      <RightSide type="home" />
    </div>
  );
};

export default Homepage;
