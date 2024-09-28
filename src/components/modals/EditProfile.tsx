import { EditProfileInput } from "@/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
}

const EditProfile: React.FC<Props> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Profile Edit Menu</DialogTitle>
        <DialogDescription>
          You can change avatar and nickname in the navbar profile
        </DialogDescription>
        <form action="" className="grid grid-cols-2 justify-between gap-2">
          <button type="button">
            <label className="text-xs text-gray block max-w-max">Cover Picture</label>
            <div className="flex items-end gap-2">
              <Image
                src="/noCover.png"
                alt="cover"
                width={48}
                height={32}
                className="object-cover"
              />
              <span className="text-sm text-gray underline">Change</span>
            </div>
          </button>
          <EditProfileInput
            label="First Name"
            name="firstname"
            placeholder="John"
          />
          <EditProfileInput
            label="Last Name"
            name="lastname"
            placeholder="Doe"
          />
          <EditProfileInput
            label="Description"
            name="description"
            placeholder="Hello world!"
          />
          <EditProfileInput label="City" name="city" placeholder="New York" />
          <EditProfileInput
            label="School"
            name="school"
            placeholder="Harvard"
          />
          <EditProfileInput label="Work" name="work" placeholder="Apple Inc." />
          <EditProfileInput
            label="Website"
            name="website"
            placeholder="https://example.com"
          />
          <button className="bg-main text-white rounded-lg p-2 col-span-2 hover:opacity-80 duration-150 mt-2">
            Update Profile
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
