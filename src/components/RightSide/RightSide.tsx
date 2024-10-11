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
    <div className="hidden  sm:block sm:w-[35%] lg:w-[35%] xl:w-[35%] ">
      {user && !isCurrentUserBlocked && (
        <UserInformationBlock
          size="lg"
          isBlocked={isBlocked}
          userId={user.id}
        />
      )}
      <Stories isStoriesPage={false} size="lg" />
      <WhoFollow currentUser={currentUser} />
    </div>
  );
};

export default RightSide;
