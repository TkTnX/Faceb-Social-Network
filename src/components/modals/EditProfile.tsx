"use client";
import { EditProfileInput } from "@/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { updateProfileInformation } from "@/lib/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { User } from "@prisma/client";
import UpdateButton from "../RightSide/UpdateButton";

interface Props {
  children: React.ReactNode;
  user: User
}

const EditProfile: React.FC<Props> = ({ children, user }) => {
  const [open, setOpen] = useState(false);
  const [profileBg, setProfileBg] = useState<any>(user.profileBg);
  const router = useRouter();
  const update = async (formData: FormData) => {
    try {
      await updateProfileInformation(formData, profileBg);
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Profile Edit Menu</DialogTitle>
        <DialogDescription>
          You can change avatar and nickname in the navbar profile
        </DialogDescription>
        <form
          action={update}
          className="grid grid-cols-2 justify-between gap-2"
        >
          <CldUploadWidget
            uploadPreset="social"
            onSuccess={(res: any) =>
              setProfileBg(res.info && res.info.secure_url)
            }
          >
            {({ open }) => {
              return (
                <button onClick={() => open()} type="button">
                  <label className="text-xs text-gray block max-w-max">
                    Cover Picture
                  </label>
                  <div className="flex items-end gap-2">
                    <Image
                      src={user.profileBg || "/noProfileBg.jpg"}
                      alt="cover"
                      width={48}
                      height={32}
                      className="object-cover"
                    />
                    <span className="text-sm text-gray underline">Change</span>
                  </div>
                </button>
              );
            }}
          </CldUploadWidget>

          <EditProfileInput
            label="First Name"
            name="firstname"
            placeholder={user.firstname || "John"}
          />
          <EditProfileInput
            label="Last Name"
            name="lastname"
            placeholder={user.lastname || "Doe"}
          />
          <EditProfileInput
            label="Description"
            name="description"
            placeholder={user.description || "Hello world!"}
          />
          <EditProfileInput label="City" name="city" placeholder="New York" />
          <EditProfileInput
            label="School"
            name="school"
            placeholder={user.school || "Harvard"}
          />
          <EditProfileInput label="Work" name="work" placeholder="Apple Inc." />
          <EditProfileInput
            label="Website"
            name="website"
            placeholder={user.website || "https://example.com"}
          />
         <UpdateButton />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
