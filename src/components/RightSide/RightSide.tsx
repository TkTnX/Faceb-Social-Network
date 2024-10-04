import { User } from "@prisma/client";
import { Stories, UserInformationBlock, WhoFollow } from "..";

const RightSide = ({
  user,
  currentUser,
  isBlocked,
}: {
  user?: User;
  currentUser: string;
  isBlocked?: boolean;
}) => {
  return (
    <div className="hidden  sm:block lg:w-[25%] xl:w-[35%] ">
      {user && <UserInformationBlock isBlocked={isBlocked} userId={user.id} />}
      <Stories />
      <WhoFollow currentUser={currentUser} />
    </div>
  );
};

export default RightSide;
