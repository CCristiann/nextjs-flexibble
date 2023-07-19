"use client";

import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

const ProfileMenu = () => {
  const { data: session }: any = useSession();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {session ? (
        <>
          <Image
            src={session?.user?.image as string}
            width={44}
            height={44}
            alt="Profile Picture"
            className="rounded-full"
            onClick={() => setIsOpen(!isOpen)}
          />
        </>
      ) : null}

      {isOpen && (
        <div className="absolute right-4 top-20 flex flex-col gap-5 border-[1px] bg-white w-full shadow-md rounded-md max-w-[18rem] p-6 text-sm z-50">
          <div className="flex flex-col items-center gap-4">
            <Image
              src={session?.user?.image}
              width={60}
              height={60}
              alt="Profile Picture"
              className="rounded-full"
            />
            <h4 className="font-semibold text-base">{session?.user?.name}</h4>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/">Work Preferences</Link>
            <Link href="/">Settings</Link>
            <Link href={`/profile/${session?.user?.id}`}>Profile</Link>
          </div>

          <div className="h-[1px] bg-neutral-200 w-full"></div>
          <div>
            <button
              className="sign-out_btn"
              onClick={() => signOut()}
              type="button"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileMenu;
