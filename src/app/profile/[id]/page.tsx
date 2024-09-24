import { CenterSide, LeftSide, RightSide } from "@/components";

const ProfilePage = () => {
  return (
    <div className="flex items-start gap-3 lg:gap-7 justify-between max-w-[1317px] px-4 mx-auto">
      {/* LEFT */}
      <LeftSide  />
      {/* CENTER */}
      <CenterSide type="profile" />
      {/* RIGHT */}
      <RightSide type="profile" />
    </div>
  );
}

export default ProfilePage