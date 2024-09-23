import { sidebarItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-[75px] bg-white h-screen z-10 hidden md:block">
      <Link className="relative left-[15px] top-[15px]" href="/">
        <Image src="/logo.svg" width={40} height={40} alt="logo" />
      </Link>
      <div className="grid gap-7 w-full items-center justify-center pt-[70px]">
        {sidebarItems.map((item, index) => (
          <Link href={item.link} key={index}>
            <Image
              src={`/sidebar/${item.imageUrl}`}
              width={26}
              height={26}
              alt="sidebar item"
              className="hover:bg-main/20  rounded-sm duration-100 hover:scale-105"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
