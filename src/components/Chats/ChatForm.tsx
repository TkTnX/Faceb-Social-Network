"use client";
import { Image as ImageIcon, VideoIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { addMessage } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import ChatFormButton from "./ChatFormButton";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ChatForm = ({ chatId }: { chatId: number }) => {
  const [value, setValue] = useState("");
  const [isSuccessAddedImage, setIsSuccessAddedImage] = useState(false);
  const [image, setImage] = useState("");
  const { userId } = useAuth();
  if (!userId) return null;
  const handleSend = async () => {
    await addMessage(value, chatId, userId, image);

    setValue("");
    setIsSuccessAddedImage(false);
    setImage("");
  };

  const changeImage = (res: any) => {
    try {
      setImage(res.info && res.info.secure_url);
      setIsSuccessAddedImage(true);
    } catch (error) {
      console.log(error);
      setIsSuccessAddedImage(false);
    }
  };

  // TODO: АДАПТИВ ДОДЕЛАТЬ ПРИ ДОБАВЛЕНИИ ВИДЕО ИЛИ ИЗОБРАЖЕНИЯ

  return (
    <>
      <form
        action={handleSend}
        className={cn("p-3 flex items-end gap-2 ", {
          "flex-wrap md:flex-nowrap": image !== "",
        })}
      >
        {isSuccessAddedImage &&
          (image.includes("video") ? (
            <video
              src={image}
              controls
              preload="metadata"
              className="object-cover rounded-lg max-w-[150px]  xl:max-w-[300px]"
            ></video>
          ) : (
            <Image
              src={image}
              width={100}
              height={100}
              className="object-cover rounded-lg w-[50px] sm:w-auto max-w-max"
              alt="image"
            />
          ))}
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Message..."
        />
        <CldUploadWidget
          uploadPreset="social"
          onSuccess={(res: any) => changeImage(res)}
          options={{
            maxFiles: 1,
            resourceType: "image",
            clientAllowedFormats: ["png", "jpg", "jpeg", "webp"],
          }}
        >
          {({ open, widget }) => {
            return (
              <button
                type="button"
                onClick={() => {
                  open();
                  widget?.open();
                }}
              >
                <ImageIcon color="#788292" className="hover:stroke-main" />
              </button>
            );
          }}
        </CldUploadWidget>
        <CldUploadWidget
          uploadPreset="social"
          options={{
            maxFiles: 1,
            resourceType: "video",
            clientAllowedFormats: ["mp4", "webm", "ogv", "avi", "mov"],
          }}
          onSuccess={(res: any) => changeImage(res)}
        >
          {({ open, widget }) => {
            return (
              <button
                type="button"
                onClick={() => {
                  open();
                  widget?.open();
                }}
              >
                <VideoIcon color="#788292" className="hover:stroke-main" />
              </button>
            );
          }}
        </CldUploadWidget>

        <ChatFormButton value={value} />
      </form>
    </>
  );
};

export default ChatForm;
