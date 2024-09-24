import Image from "next/image";

const UserCard = () => {
  return (
    <div className="">
      <div className="relative h-52 w-full">
        <Image
          src="https://i.pinimg.com/564x/3f/a1/b7/3fa1b77f4a0983961c42bf32f189b450.jpg"
          alt="bg"
          fill
          className="rounded-lg object-cover"
        />
        <Image
          src="https://i.pinimg.com/564x/97/bb/06/97bb067e30ff6b89f4fbb7b9141025ca.jpg"
          width={128}
          height={128}
          className="rounded-full absolute left-0 right-0 m-auto -bottom-16 w-32 h-32 outline outline-4 outline-white"
          alt="avatar"
        />
      </div>

      <div className="text-center mt-20 pb-14">
        <h1 className="font-bold text-2xl">Timur Galiakbarov</h1>
        <div className="flex items-center justify-center gap-14 mt-3">
          <div className="text-center text-xs">
            <span className="text-gray text-sm">123</span>
            <h6 className="text-black/80 font-bold">Posts</h6>
          </div>
          <div className="text-center text-xs">
            <span className="text-gray text-sm">1.2K</span>
            <h6 className="text-black/80 font-bold">Followers</h6>
          </div>
          <div className="text-center text-xs">
            <span className="text-gray text-sm">1.3K</span>
            <h6 className="text-black/80 font-bold">Following</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
