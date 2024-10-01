"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const CommentsInteractions = () => {
  const { user } = useUser();
  const [value, setValue] = useState("");
  if (!user) return null;

  return (
    <>
      <div className="flex items-center gap-2 w-full">
        <Image
          src={user.imageUrl || "/noAvatar.jpg"}
          width={40}
          height={40}
          alt="avatar"
          className="rounded-full"
        />
        <form action="" className="flex-1 flex items-center gap-1">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Add a comment"
          />
          <button
            className={cn(
              "text-white p-2 rounded-lg bg-main hover:bg-main/90 duration-100",
              {
                "bg-gray/50 text-black/50 cursor-not-allowed hover:bg-gray/50":
                  value.length === 0,
              }
            )}
          >
            Send
          </button>
        </form>
      </div>
      <div className=" p-3">
        {/* COMMENTS  LIST */}

        {/* COMMENT */}
        <div className="flex items-start gap-1 border-b-gray/50 border-b pb-2">
          <Image
            src="/avatar.svg"
            width={28}
            height={28}
            alt="avatar"
            className="rounded-full"
          />
          <p className="text-gray text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            delectus debitis ullam quae in, quasi at neque sit consequuntur
            distinctio accusamus nam sint velit nulla, fugiat inventore enim
            deleniti tenetur ab autem nobis! Tempora, quia ipsam repellat maxime
            adipisci quam quod provident veniam esse aspernatur? Rerum
            voluptatum voluptates quo necessitatibus.
          </p>
        </div>
      </div>
    </>
  );
};

export default CommentsInteractions;
