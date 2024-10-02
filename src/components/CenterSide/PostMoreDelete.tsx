"use client";
import { X } from "lucide-react";
import { useFormStatus } from "react-dom";

const PostMoreDelete = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="flex items-center gap-2 text-red-500 hover:bg-main/20 p-2 rounded-lg hover:text-main duration-100 group disabled:opacity-50 disabled:pointer-events-none"
    >
      <X />{" "}
      <span className="text-gray group-hover:text-main">
        {pending ? "Deleting..." : "Delete"}
      </span>
    </button>
  );
};

export default PostMoreDelete;
