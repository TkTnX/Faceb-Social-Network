import { Stories, UserInformationBlock, WhoFollow } from ".";

const RightSide = ({ type }: { type: "home" | "profile" }) => {
  return (
    <div className="hidden  sm:block sm:w-[35%] xl:w-[30%] ">
      {type === "profile" && <UserInformationBlock />}
      <Stories />
      <WhoFollow />
    </div>
  );
}

export default RightSide