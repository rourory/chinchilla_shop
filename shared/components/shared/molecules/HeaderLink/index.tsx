import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Imperial_Script } from "next/font/google";

const imperialScript = Imperial_Script({ subsets: ["latin"], weight: "400" });

const HeaderLink = () => {
  return (
    <Link href={"/"}>
      <div className="flex items-center gap-4">
        <Image
          className="absolute top-3"
          src={"/chinchilla-blue.png"}
          alt="Logo"
          width={100}
          height={100}
        />
        <div className={`${imperialScript.className} pl-[110px]`}>
          <h1 className="text-5xl font-black">Chinchilla</h1>
          <p className="text-3xl text-gray-400 leading-3">
            customizable clothing for you
          </p>
        </div>
      </div>
    </Link>
  );
};

export default HeaderLink;
