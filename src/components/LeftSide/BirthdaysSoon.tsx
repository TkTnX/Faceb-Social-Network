"use client";
import { Gift } from "lucide-react";
import { UserFollowingsWithBirthday } from "./LeftSide";
import { useState } from "react";
import BirthdaysItem from "./BirthdaysItem";

const BirthdaysSoon = ({
  birthdaysSoon,
}: {
  birthdaysSoon: UserFollowingsWithBirthday[];
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="text-[9px] text-gray flex items-center gap-1 mt-4 bg-main/10 p-1 rounded-lg hover:bg-main/20 duration-100 w-full"
      >
        <Gift size={16} color="#1d9bf0" />
        <div>
          <p className="">upcoming Birthdays</p>
          <p>See other {birthdaysSoon.length} have upcoming birthdays</p>
        </div>
      </button>
      {open && (
        <div className="mt-3 border-t border-t-gray/20 pt-5 grid gap-3">
          {birthdaysSoon.length > 0 ? (
            birthdaysSoon.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between gap-1"
              >
                <BirthdaysItem user={user.following} />
                {user.following.birthday && (
                  <p className="text-xs text-gray">
                    {user.following.birthday.toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            ))
          ) : (
            <span>No upcoming birthdays</span>
          )}
        </div>
      )}
    </div>
  );
};

export default BirthdaysSoon;
