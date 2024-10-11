"use client";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Bell, LogIn, MessageCircleMore, Users } from "lucide-react";
import Link from "next/link";
import { MobileMenu, Search } from "@/components";

const UserInfo = ({ users }: { users: {id: string, nickname: string, avatar: string | null, firstname: string, lastname: string}[]}) => {
  return (
    <div className="flex items-center gap-1 justify-between w-full vsm:w-auto vsm:gap-4">
      <Search users={users} />
      <ClerkLoading>
        <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <Link href="/sign-in" className={"items-center gap-2 group vsm:flex"}>
            <LogIn
              color="#788292"
              className="group-hover:stroke-main transition duration-200"
            />
            <span className="hidden md:inline text-sm text-gray hover:text-main duration-200">
              Register/Login
            </span>
          </Link>
        </SignedOut>
        <SignedIn>
          <div className="hidden md:flex itmes-cneter gap-4">
            <button>
              <MessageCircleMore
                color="#788292 "
                className="hover:stroke-main transition duration-200"
              />
            </button>
            <button>
              <Users
                color="#788292 "
                className="hover:stroke-main transition duration-200"
              />
            </button>
            <button>
              <Bell
                color="#788292 "
                className="hover:stroke-main transition duration-200"
              />
            </button>
          </div>

          <div className="border border-main rounded-full p-1 h-[38px] bg-white shadow-lg">
            <UserButton />
          </div>
        </SignedIn>
      </ClerkLoaded>
      <MobileMenu />
    </div>
  );
};

export default UserInfo;
