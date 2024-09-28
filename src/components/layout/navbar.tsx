import Image from "next/image";
import React from "react";

export const Navbar = () => {
  return (
    <div className="top-0 left-0 z-[1] fixed flex justify-end items-center border-[#DBDBDB] bg-white pr-12 border-b w-full h-[72px]">
      <div className="flex items-center gap-6">
        <Image
          src="/images/message-question.svg"
          width={26}
          height={24}
          alt="Logo"
        />
        <button type="button" className="relative">
          <div className="top-0 right-1 absolute bg-red-500 rounded-full size-[7px]" />
          <Image
            src="/images/notification.svg"
            width={26}
            height={24}
            alt="Logo"
          />
        </button>
        <div className="flex items-center gap-5">
          <div className="flex flex-col justify-between">
            <h1 className="text-right font-normal text-[#0D062D] text-sm">
              Mihir Aman Raj
            </h1>
            <p className="text-right font-normal text-[#787486] text-sm">
              JSR, India
            </p>
          </div>
          <div className="flex items-center gap-[10px]">
            <Image
              alt="profile-pic"
              src="/demos/profile-pic.png"
              width={44}
              height={44}
              className="rounded-full"
            />
            <Image
              alt="arrow-down"
              src="/images/arrow-down.svg"
              width={18}
              height={18}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
