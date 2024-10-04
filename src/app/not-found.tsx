"use client";

import { usePathname } from "next/navigation";

const NotFound = () => {
  const pathname = usePathname();
  const nickname = pathname.split("/").slice(2);
  const isProfilePage = pathname.includes("/profile/");
  return (
    <div className="text-center h-[calc(100vh-300px)] flex-col flex items-center justify-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-2xl">
        {isProfilePage
          ? `User ${nickname} is not found`
          : `Page ${pathname} is not found`}
      </p>
    </div>
  );
};

export default NotFound;
