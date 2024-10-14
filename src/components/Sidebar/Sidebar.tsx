import Image from "next/image";
import Link from "next/link";
import { SidebarChangeTheme } from "./SidebarChangeTheme";

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-[75px]  h-screen z-10 hidden md:block changeBg">
      <Link className="relative left-[15px] top-[15px]" href="/">
        <Image src="/logo.svg" width={40} height={40} alt="logo" />
      </Link>
      <div className="grid gap-7 w-full items-center justify-center pt-[70px]">
        <SidebarChangeTheme />
      </div>
    </div>
  );
};

export default Sidebar;
