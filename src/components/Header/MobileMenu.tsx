"use client";
import { useEffect, useState } from "react";
import { NavbarItem, SidebarChangeTheme } from "@/components";
import { navbarItems } from "@/constants";
import clsx from "clsx";
const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.setProperty(
        "overflow",
        "hidden",
        "important"
      );
    } else {
      document.body.style.removeProperty("overflow");
    }
  }, [open]);

  return (
    <div className="sm:hidden block">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex flex-col gap-1 w-[30px]"
      >
        <span
          className={clsx(
            "w-full h-1 bg-main block rounded-full duration-500",
            open && "rotate-45 translate-y-2"
          )}
        ></span>
        <span
          className={clsx(
            "w-full h-1 bg-main block rounded-full duration-500",
            open && "opacity-0"
          )}
        ></span>
        <span
          className={clsx(
            "w-full h-1 bg-main block rounded-full duration-500",
            open && "-rotate-45 -translate-y-2"
          )}
        ></span>
      </button>
      {open && (
        <div className="fixed z-10 top-[70px] right-0 left-0 h-full  text-center flex flex-col items-center justify-center gap-5 changeBg">
          {navbarItems.map((item, index) => (
            <button onClick={() => setOpen(false)} key={index}>
              <NavbarItem isInMenu={true} name={item.name} href={item.href} />
            </button>
          ))}
          <button onClick={() => setOpen(false)}>
            <NavbarItem isInMenu={true} name="Chats" href="/c" />
          </button>
          <SidebarChangeTheme />
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
