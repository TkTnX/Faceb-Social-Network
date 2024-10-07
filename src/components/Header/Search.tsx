"use client";
import { Search as SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Search = ({
  users,
}: {
  users: { id: string; nickname: string; avatar: string | null, firstname: string, lastname: string }[];
}) => {
    const [value, setValue] = useState("");
    
    const filteredUsers = useMemo(() => {
      return users.filter(
        (user) =>
          user.nickname.toLowerCase().includes(value) ||
          user.firstname.toLowerCase().includes(value) ||
          user.lastname.toLowerCase().includes(value)
      );
    }, [value, users]);
  return (
    <>
      <div className="hidden vsm:flex items-center bg-slate-100 rounded-xl px-3 py-1">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value.toLowerCase())}
          className="bg-transparent  outline-none"
          placeholder="search..."
        />
        <button>
          <SearchIcon
            color="#788292"
            className="hover:stroke-main transition duration-200"
          />
        </button>
      </div>
      {value && (
        <div className="absolute top-[70px] bg-white rounded-lg p-3 min-w-[320px] z-10">
          <h5 className="text-gray text-sm">Find users</h5>
          {Boolean(filteredUsers.length) ? (
            filteredUsers.map((user) => (
              <Link
                className="flex items-center gap-3 hover:bg-main/20 duration-150 py-2 px-1 rounded-md"
                href={`/profile/${user.nickname}`}
                key={user.id}
              >
                <Image
                  src={user.avatar || "/noAvatar.jpg"}
                  width={40}
                  height={40}
                  alt="avatar"
                  className="rounded-full h-10"
                />
                    <div>
                        <p className="text-sm text-main">{user.firstname || user.lastname && `${user.firstname} ${user.lastname}`}</p>
                  <span className="text-xs text-gray">{user.nickname}</span>
                </div>
              </Link>
            ))
          ) : (
            <span className="text-xs text-gray">No users found</span>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
