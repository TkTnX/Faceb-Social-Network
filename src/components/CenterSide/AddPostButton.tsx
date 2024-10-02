"use client";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

const AddPostButton = ({ desc }: { desc: string }) => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={cn(
        "bg-main text-white rounded-lg p-2 col-span-2 hover:opacity-80 duration-150 mt-2 disabled:opactity-80 disabled:pointer-events-none disabled:bg-gray",
        { "opacity-50 pointer-events-none": desc === "" }
      )}
    >
      {pending ? (
        "Sending..."
      ) : (
        "Send"
      )}
    </button>
  );
};

export default AddPostButton;
