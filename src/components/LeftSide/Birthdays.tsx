import { UserFollowingsWithBirthday } from "./LeftSide";
import BirthdaysSoon from "./BirthdaysSoon";
import BirthdaysItem from "./BirthdaysItem";
import { getDate } from "@/lib/getDate";
import { Card } from "../ui/card";

const Birthdays = async ({
  userFollowings,
}: {
  userFollowings?: UserFollowingsWithBirthday[];
}) => {
  const today = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  if (!userFollowings || userFollowings.length === 0) return null;

  const birthdaysToday = userFollowings.filter((user) => {
    return (
      user.following.birthday && getDate(user.following.birthday) === today
    );
  });

  const birthdaysSoon = userFollowings.filter((user) => {
    return (
      user.following.birthday && getDate(user.following.birthday) !== today
    );
  });

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h4 className="text-[#203758] text-lg font-medium">Birthdays</h4>
      </div>
      <Card className=" rounded-lg border  p-3 mt-4 grid gap-3">
        {birthdaysToday.length > 0 ? (
          birthdaysToday.map((user) => (
            <BirthdaysItem key={user.following.id} user={user.following} />
          ))
        ) : (
          <span className="text-xs text-gray">No birthdays today</span>
        )}

        {/* MORE BIRTHDAYS */}
        <BirthdaysSoon birthdaysSoon={birthdaysSoon} />
      </Card>
    </div>
  );
};

export default Birthdays;
