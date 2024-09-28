import { SIDE_BAR } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Sidebar = () => {
  return (
    <aside className="top-0 left-0 z-[2] sticky border-[#DBDBDB] border-r w-[280px] h-screen">
      <div className="flex justify-between items-center border-[#DBDBDB] px-5 border-b h-[72px]">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.svg" width={24} height={24} alt="Logo" />
          <h1 className="font-semibold text-[#0D062D] text-xl">Edit.Bridge</h1>
        </div>
        <Image src="/images/collapse.svg" width={26} height={20} alt="Logo" />
      </div>
      <div className="px-3 pt-8">
        <div className="flex flex-col gap-6 border-[#DBDBDB] px-2 pt-2 pb-8 border-b">
          {SIDE_BAR.map((item, index) => (
            <Link href={item?.path} key={index} className="flex items-center gap-3 hover:bg-[#1d1c1c2a] p-2 rounded-md w-full transition-all hover:translate-x-1 duration-150 ease-in-out">
              <Image src={item.icon} width={24} height={24} alt="Logo" />
              <h2 className="font-medium text-[#787486] text-base">{item.title}</h2>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};
