"use client";
import { useState } from "react";
import { NavbarItem } from "@/components";
import { navbarItems } from "@/constants";
import clsx from "clsx";
const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="sm:hidden block">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex flex-col gap-1 w-[30px]"
      >
        <span className={clsx("w-full h-1 bg-main block rounded-full duration-500", open && "rotate-45 translate-y-2")}></span>
        <span className={clsx("w-full h-1 bg-main block rounded-full duration-500", open && "opacity-0")}></span>
        <span className={clsx("w-full h-1 bg-main block rounded-full duration-500", open && "-rotate-45 -translate-y-2")}></span>
      </button>
      {open && (
        <div className="absolute z-10 top-[70px] right-0 left-0 h-[calc(100vh-70px)] bg-white text-center flex flex-col items-center justify-center">
          {navbarItems.map((item, index) => (
            <button onClick={() => setOpen(false)} key={index}>
              <NavbarItem isInMenu={true} name={item.name} href={item.href} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
