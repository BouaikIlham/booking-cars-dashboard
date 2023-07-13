"use client"

import { UserButton } from "@clerk/nextjs"
import MainNav from "./MainNav"
const Navbar = () => {
  return (
    <>
      <div className="border-b">
        <div className="h-16 px-4 flex items-center">
          <div>
           this will be store switcher
          </div>
          <MainNav className="mx-6"/>
          <div className="flex items-center ml-auto space-x-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar