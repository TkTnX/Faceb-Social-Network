"use client";

import { useFormStatus } from "react-dom";


const UpdateButton = () => {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="bg-main text-white rounded-lg p-2 col-span-2 hover:opacity-80 duration-150 mt-2 disabled:opactity-80 disabled:pointer-events-none disabled:bg-gray ">
      {pending ? "Updating..." : "Update profile"}
    </button>
  );
};

export default UpdateButton;
