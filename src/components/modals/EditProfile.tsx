"use client";
import { EditProfileInput } from "@/components";

import { format } from "date-fns";
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
import toast from "react-hot-toast";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface Props {
  children: React.ReactNode;
  user: User;
}

const EditProfile: React.FC<Props> = ({ children, user }) => {
  const [open, setOpen] = useState(false);
  const [profileBg, setProfileBg] = useState<any>(user.profileBg);
  const [birthday, setBirthday] = useState<Date>();
  const router = useRouter();
  const update = async (formData: FormData) => {
    try {
      await updateProfileInformation(formData, profileBg, birthday);
      setOpen(false);
      toast.success("Profile updated successfully");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
                <button onClick={() => open()} type="button" className="col-span-2">
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
        
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "text-left font-normal flex items-center  border rounded-md border-[#e5e5e5] px-3 gap-3 self-end py-2",
                  !birthday && "text-muted-foreground"
                )}
              >
                <CalendarIcon color="#788292" size={16} />
                {birthday ? (
                  format(birthday, "PPP")
                ) : (
                  <span className="text-gray">Pick a Birthday</span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                className="text-gray"
                mode="single"
                selected={birthday}
                onSelect={setBirthday}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <UpdateButton />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
