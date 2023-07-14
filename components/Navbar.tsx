import { auth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import MainNav from "./MainNav";
import StoreSwitcher from "./StoreSwitcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <>
      <div className="border-b">
        <div className="h-16 px-4 flex items-center">
          <StoreSwitcher items={stores} className="" />
          <MainNav className="mx-6" />
          <div className="flex items-center ml-auto space-x-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
