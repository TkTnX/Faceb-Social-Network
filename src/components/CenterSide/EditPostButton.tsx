"use client";

import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

const EditPostButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={
        "bg-main text-white w-full rounded-lg p-2 col-span-2 hover:opacity-80 duration-150 mt-2 disabled:opactity-80 disabled:pointer-events-none disabled:bg-gray"
      }
    >
      {pending ? "Updating..." : "Update"}
    </button>
  );
};

export default EditPostButton;
