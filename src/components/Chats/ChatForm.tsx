"use client";
import { Image as ImageIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { addMessage } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import ChatFormButton from "./ChatFormButton";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

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

  return (
    <>
      <form action={handleSend} className="p-3 flex items-end gap-2">
        {isSuccessAddedImage && (
          <Image
            src={image}
            width={100}
            height={100}
            className="object-cover rounded-lg w-[50px] sm:w-auto max-w-max"
            alt="image"
          />
        )}
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Message..."
        />
        <CldUploadWidget
          uploadPreset="social"
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
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <ImageIcon color="#788292" className="hover:stroke-main" />
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
