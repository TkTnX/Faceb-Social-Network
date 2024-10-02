"use client";
import { User } from "@prisma/client";
import { Calendar, ImageIcon, PenToolIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import { AddPostButton } from "@/components";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { addPost } from "@/lib/actions";
const AddNewPost = ({ user }: { user?: User }) => {
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState<any>("");
  const [isSuccessAddedImage, setIsSuccessAddedImage] = useState(false);

  const addNewPostFunc = async (formData: FormData) => {
    try {
      await addPost(formData, image);

      setDesc("")
      setImage("")
      setIsSuccessAddedImage(false)
    } catch (error) {
      console.log(error);
    }
  };

  const changeImage = (res: any) => {
    try {
      setImage(res.info && res.info.secure_url);
      setIsSuccessAddedImage(true)
    } catch (error) {
      console.log(error)
      setIsSuccessAddedImage(false)
    }
  }

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden p-4">
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
            className="w-full bg-gray/5 rounded-lg p-2  outline-none min-h-[55px] max-h-48 overflow-hidden"
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
                <span>Photo</span>
                {isSuccessAddedImage && <span className="text-main">✓</span>}
              </button>
            );
          }}
        </CldUploadWidget>

        <button className="flex items-center gap-1 text-gray text-sm hover:text-main duration-200">
          <VideoIcon size={22} color="#1d9bf0" />
          <span>Video</span>
        </button>
        <button className="flex items-center gap-1 text-gray text-sm hover:text-main duration-200">
          <Calendar size={22} color="#1d9bf0" />
          <span>Event</span>
        </button>
        <button className="flex items-center gap-1 text-gray text-sm hover:text-main duration-200">
          <PenToolIcon size={22} color="#1d9bf0" />
          <span>Poll</span>
        </button>
      </div>
    </div>
  );
};

export default AddNewPost;
