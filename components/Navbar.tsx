"use client"

import { UserButton } from "@clerk/nextjs"

const Navbar = () => {
  return (
    <>
      <div className="border-b">
        <div className="h-16 px-4 flex items-center">
          <div>
           this will be store switcher
          </div>
          <div>
            this will be routes
          </div>
          <div className="flex items-center ml-auto space-x-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar