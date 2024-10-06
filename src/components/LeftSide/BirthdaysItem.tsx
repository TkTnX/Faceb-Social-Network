import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const BirthdaysItem = ({user}: {user: User}) => {
  return (
    <div
      className="flex items-center gap-1 justify-between last:border-0  first:pt-0"
    >
      <Link className="flex items-center gap-1 group" href="/profile/1">
        <Image
          src={user.avatar || "/noAvatar.jpg"}
          width={25}
          height={25}
          alt="avatar"
          className="rounded-full min-h-[25px] min-w[25px] h-[25px] w-[25px]"
        />
        <span className="text-gray text-xs group-hover:text-main">
          {user.firstname || user.lastname
            ? `${user.firstname} ${user.lastname}`
            : user.nickname}
        </span>
      </Link>
    </div>
  );
}

export default BirthdaysItem