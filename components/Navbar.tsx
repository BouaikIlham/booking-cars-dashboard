"use client"

import { UserButton } from "@clerk/nextjs"
import MainNav from "./MainNav"
import StoreSwitcher from "./StoreSwitcher"
const Navbar = () => {
  return (
    <>
      <div className="border-b">
        <div className="h-16 px-4 flex items-center">
          <StoreSwitcher />
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