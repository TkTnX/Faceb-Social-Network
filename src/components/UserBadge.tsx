import Image from "next/image";
import Link from "next/link";

const UserBadge = () => {
  return (
    <div className="bg-white rounded-lg border border-[#F1F2F6] p-3 mb-9">
      <div className="relative h-20 w-full">
        <Image
          src="https://i.pinimg.com/736x/2d/67/f9/2d67f9834649b584682ab58606f5a27e.jpg"
          alt="profile bg"
          fill
          className="w-full object-cover"
        />
      </div>

      <div className="-mt-5 relative grid text-center">
        <Image
          src="https://i.pinimg.com/564x/67/dd/33/67dd333696cf3b13702f83e97e16167d.jpg"
          width={40}
          height={40}
          alt="avatar"
          className="rounded-full h-10 justify-self-center"
        />
        <h6 className="text-sm font-medium text-[#203758]">Thomas Ben</h6>
        <p className="text-xs text-gray">123 followers</p>
        <Link
          className="text-main bg-main/10 max-w-max px-2 py-1 rounded-md mx-auto mt-3 hover:text-white hover:bg-main duration-100"  
          href="/profile/1"
        >
          My profile
        </Link>
      </div>
    </div>
  );
}

export default UserBadge