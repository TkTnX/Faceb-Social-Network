import {  User } from "@prisma/client";
import { Stories, UserInformationBlock, WhoFollow } from ".";

const RightSide = ({ user }: { user?: User }) => {
  return (
    <div className="hidden  sm:block sm:w-[35%] xl:w-[30%] ">
      {user && <UserInformationBlock userId={user.id} />}
      <Stories  />
      <WhoFollow />
    </div>
  );
};

export default RightSide;
