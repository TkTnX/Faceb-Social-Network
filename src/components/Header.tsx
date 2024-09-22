import Image from "next/image";
import Link from "next/link";
import {  Navbar, UserInfo } from ".";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-4 h-[70px]">
      {/* LEFT */}
      <div className="">
        <Link href="/">
          <Image src="/logo.svg" width={40} height={40} alt="logo" />
        </Link>
      </div>
      {/* CENTER */}
      <div className="hidden sm:block">
        <Navbar />
      </div>
      {/* RIGHT */}
      <UserInfo />
    </div>
  );
};

export default Header;
