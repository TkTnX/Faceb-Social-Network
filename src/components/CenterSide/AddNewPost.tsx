"use client";
import { User } from "@prisma/client";
import { Calendar, ImageIcon, PenToolIcon } from "lucide-react";
import Image from "next/image";
import { AddPostButton } from "@/components";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { addPost } from "@/lib/actions";
import toast from "react-hot-toast";
import { Card } from "../ui/card";
const AddNewPost = ({
  user,
  reloadPosts,
}: {
  user?: User;
  reloadPosts?: () => void;
}) => {
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState<any>("");
  const [isSuccessAddedImage, setIsSuccessAddedImage] = useState(false);

  const addNewPostFunc = async (formData: FormData) => {
    try {
      await addPost(formData, image);
      reloadPosts && reloadPosts();
      setDesc("");
      setImage("");
      setIsSuccessAddedImage(false);
      toast.success("Post added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const changeImage = (res: any) => {
    console.log(res.info.url.includes("video"));
    try {
      setImage(res.info && res.info.secure_url);
      setIsSuccessAddedImage(true);
    } catch (error) {
      console.log(error);
      setIsSuccessAddedImage(false);
    }
  };

  return (
    <Card className="w-full rounded-lg overflow-hidden p-4 border-none shadow-none">
      <div className="flex items-start gap-3 pb-3">
        <Image
          src={user?.avatar || "/noAvatar.jpg"}
          width={40}
          height={40}
          alt={user?.nickname || "no avatar"}
          className="rounded-full h-10"
        />
        <form
          action={(formData) => addNewPostFunc(formData)}
          className="w-full flex items-center gap-2"
        >
          <textarea
            placeholder={`What's on you mind, ${
              user?.firstname || user?.nickname
            }?`}
            name="desc"
            className="w-full bg-gray/5 rounded-lg p-2 placeholder:text-xs  outline-none min-h-[55px] max-h-48 overflow-hidden"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
          <AddPostButton desc={desc} />
        </form>
      </div>
      <div className="flex items-center gap-5 border-t  border-gray/20 pt-3 flex-wrap">
        <CldUploadWidget
          uploadPreset="social"
          onSuccess={(res: any) => changeImage(res)}
        >
          {({ open, widget }) => {
            return (
              <button
                onClick={() => {
                  open();
                  widget?.open();
                }}
                className="flex items-center gap-1 text-gray text-sm hover:text-main duration-200"
              >
                <ImageIcon size={20} color="#1d9bf0" />
                <span>Media</span>
                {isSuccessAddedImage && <span className="text-main">✓</span>}
              </button>
            );
          }}
        </CldUploadWidget>

        <button className="flex items-center gap-1 text-gray text-sm hover:text-main duration-200">
          <Calendar size={22} color="#1d9bf0" />
          <span>Event</span>
        </button>
        <button className="flex items-center gap-1 text-gray text-sm hover:text-main duration-200">
          <PenToolIcon size={22} color="#1d9bf0" />
          <span>Poll</span>
        </button>
      </div>
    </Card>
  );
};

export default AddNewPost;
