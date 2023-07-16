"use client"

import Link from "next/link"
import Image from "next/image"

import { NavLinks } from "@/costants/costants"
import Providers from '../Providers'
import { useSession } from "next-auth/react"
import { signOut } from 'next-auth/react'
import ProfileMenu from "../ProfileMenu"

const Navbar = () => {

  const { data: session } = useSession()

  return (
    <nav className="navbar">
      <div className="flex-1 flex justify-start gap-10">
      <Link href="/">
        <Image
        src='/assets/images/logo.svg'
        width={100}
        height={55}
        alt="Flexibble"
        />
      </Link>

      <ul className="xl:flex hidden text-small gap-7">
        {NavLinks.map((navlink) => (
          <Link 
          className="flex items-center justify-center font-medium"
          key={navlink.key} 
          href={navlink.href}>
            <li>{navlink.text}</li>
          </Link>
        ))}
      </ul>
      </div>

      <div className="flex items-center gap-7">
        {session ? (
          <>
          <ProfileMenu />

          <Link 
          className="share-work_btn"
          href='/create-project'>
            Share Work
          </Link>
          </>
        ) : (
          <Link
          href='/sign-in'
          className="sign-in_btn"
          >
            Sign in
          </Link>
        )}
      </div>

      <div>
      </div>
    </nav>
  )
}

export default Navbar
