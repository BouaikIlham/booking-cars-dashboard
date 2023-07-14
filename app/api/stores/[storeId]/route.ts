import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
        return new NextResponse("Name is required", { status: 400 });
    }
    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name
      },
    });

    return NextResponse.json(store);

  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal_error", { status: 500 });
  }
}