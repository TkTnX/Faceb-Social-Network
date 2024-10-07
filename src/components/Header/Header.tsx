import Image from "next/image";
import Link from "next/link";
import { Navbar, UserInfo } from "..";
import { prisma } from "@/lib/client";

const Header = async () => {
  const users = await prisma.user.findMany({
    select: {
      nickname: true,
      id: true,
      avatar: true,
      firstname: true,
      lastname: true,
    },
  });
  return (
    <header className="flex items-center justify-between px-4 h-[70px] bg-white">
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
      <UserInfo users={users} />
    </header>
  );
};

export default Header;
