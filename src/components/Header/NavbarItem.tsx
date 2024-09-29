"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarItem = ({
  name,
  href,
  isInMenu,
}: {
  name: string;
  href: string;
  isInMenu?: boolean
}) => {
  const pathname = usePathname();
  return (
    <Link
      className={clsx(
        "text-sm text-gray gap-10 block hover:text-main duration-200 relative",
        {
          "text-main before:content-[''] before:absolute before:rounded-b-full before:-top-[125%] before:w-full before:h-1 before:bg-main":
            href === pathname && !isInMenu,
          },
          {
            "text-lg": isInMenu,
        }
      )}
      href={href}
    >
      {name}
    </Link>
  );
};

export default NavbarItem;
