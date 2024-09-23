import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-[75px] bg-white h-screen z-10 hidden md:block">
      <Link className="relative left-[15px] top-[15px]" href="/">
        <Image src="/logo.svg" width={40} height={40} alt="logo" />
      </Link>
      <div className="grid gap-7 w-full items-center justify-center pt-[70px]">
        <Image
          src="/sidebar/01.svg"
          width={26}
          height={26}
          alt="sidebar item"
        />
        <Image
          src="/sidebar/02.svg"
          width={26}
          height={26}
          alt="sidebar item"
        />
        <Image
          src="/sidebar/03.svg"
          width={26}
          height={26}
          alt="sidebar item"
        />
        <Image
          src="/sidebar/04.svg"
          width={26}
          height={26}
          alt="sidebar item"
        />
        <Image
          src="/sidebar/05.svg"
          width={26}
          height={26}
          alt="sidebar item"
        />
        <Image
          src="/sidebar/06.svg"
          width={26}
          height={26}
          alt="sidebar item"
        />
        <Image
          src="/sidebar/07.svg"
          width={26}
          height={26}
          alt="sidebar item"
        />
        <Image
          src="/sidebar/08.svg"
          width={26}
          height={26}
          alt="sidebar item"
        />
      </div>
    </div>
  );
};

export default Sidebar;
