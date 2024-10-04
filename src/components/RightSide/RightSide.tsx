import { Block, User } from "@prisma/client";
import { Stories, UserInformationBlock, WhoFollow } from "..";

const RightSide = ({
  user,
  currentUser,
  isBlocked,
  isCurrentUserBlocked,
}: {
  user?: User;
  currentUser: string;
  isBlocked?: boolean;
  isCurrentUserBlocked?: Block | null;
}) => {
  return (
    <div className="hidden  sm:block sm:w-[25%] lg:w-[25%] xl:w-[35%] ">
      {user && !isCurrentUserBlocked && <UserInformationBlock isBlocked={isBlocked} userId={user.id} />}
      <Stories />
      <WhoFollow currentUser={currentUser} />
    </div>
  );
};

export default RightSide;
