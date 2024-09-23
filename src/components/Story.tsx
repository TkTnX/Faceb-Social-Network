import Image from "next/image";

const Story = () => {
  return (
    <div className="relative h-[210px] min-w-[115px] text-center">
      <Image
        src="/storyPrev.jpg"
        alt="story"
        fill
        className="rounded-lg w-full"
      />
      <div className="absolute bottom-[19px] left-[15px] right-[15px] grid gap-1 ">
        <Image
          src="https://i.pinimg.com/564x/67/dd/33/67dd333696cf3b13702f83e97e16167d.jpg"
          width={40}
          height={40}
          alt="avatar"
          className="rounded-full h-10  justify-self-center stroke-main border border-main p-[2px] bg-white"
        />
        <h6 className="text-white text-[13px] font-normal">Thomas Ben</h6>
      </div>
    </div>
  );
};

export default Story;
