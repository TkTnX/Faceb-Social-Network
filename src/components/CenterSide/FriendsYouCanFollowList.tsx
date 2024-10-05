"use client";
import { User } from "@prisma/client";
import { FriendsPageItem } from "..";
import { useState } from "react";
import { Search, X } from "lucide-react";

const FriendsYouCanFollowList = ({ users }: { users: User[] }) => {
  const [value, setValue] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFinalValue(value.toLowerCase());
  };

  const fullUserName = (user: User) => {
    return `${user.firstname} ${user.lastname} ${user.nickname}`.toLowerCase();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white flex items-center px-2 py-3 border border-[#F1F2F6] rounded-lg mt-2"
      >
        <input
          name="search"
          placeholder="Find people..."
          className="outline-none w-full "
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {value && (
          <button onClick={() => setValue("")} type="button">
            <X />
          </button>
        )}
        <button className="">
          <Search size={18} />
        </button>
      </form>
      <div className="mt-3 flex gap-3 flex-wrap bg-white p-3 rounded-lg border border-[#F1F2F6]">
        {users.length > 0 ? (
          users
            .filter((user) => fullUserName(user).includes(finalValue))
            .map((user) => (
              <FriendsPageItem isFriends={false} key={user.id} user={user} />
            ))
        ) : (
          <span>There are no users that you can follow</span>
        )}
      </div>
    </>
  );
};

export default FriendsYouCanFollowList;
