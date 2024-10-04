"use client";
import { editPost } from "@/lib/actions";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

const EditPost = ({
  children,
  postId,
}: {
  children: React.ReactNode;
  postId: number;
}) => {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState(null);
  const [isSuccessImgChange, setIsSuccessImgChange] = useState(false);

  const editPostFunc = async (formData: FormData) => {
    try {
      await editPost(postId, formData, img);
      setOpen(false);
      toast.success("Post updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Post</DialogTitle>
        <form action={(formData) => editPostFunc(formData)}>
          <textarea
            name="desc"
            placeholder="New Description..."
            className="outline-none w-full p-2 rounded-md min-h-10 max-h-24 border border-neutral-200"
          />
          <CldUploadWidget
            uploadPreset="social"
            onSuccess={(res: any) => {
              setImg(res.info && res.info.secure_url);
              setIsSuccessImgChange(true);
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
                  className="flex items-center gap-1 text-gray text-sm hover:text-main duration-200"
                >
                  <ImageIcon size={20} color="#1d9bf0" />
                  <span>Photo</span>
                  {isSuccessImgChange && (
                    <span className="text-xs text-main mt-2">Updated!</span>
                  )}
                </button>
              );
            }}
          </CldUploadWidget>
          <button className="bg-main w-full text-white text-center py-2 mt-2 rounded-md hover:opacity-80 duration-150">
            Update
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPost;
