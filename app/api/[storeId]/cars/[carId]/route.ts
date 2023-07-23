import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { carId: string } }
) {
  try {
    if (params.carId) {
      return new NextResponse("car id is required", { status: 400 });
    }

    const car = await prismadb.car.findUnique({
      where: {
        id: params.carId,
      },
    });
    return NextResponse.json(car);
  } catch (error) {
    console.log("[CAR_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

/////////// Delete /////////////

export async function DELETE(
  req: Request,
  { params }: { params: { carId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    if (!params.carId) {
      return new NextResponse("Card is ie required", { status: 400 });
    }

    const car = await prismadb.car.delete({
      where: {
        id: params.carId,
      },
    });

    return NextResponse.json(car);
  } catch (error) {
    console.log("[CAR_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

////////// Update //////////

export async function PATCH(
  req: Request,
  { params }: { params: { carId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      model,
      description,
      mileage,
      capicity,
      transmission,
      isAvailable,
      price,
      categoryId,
      images,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!model) {
      return new NextResponse("model is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("description is required", { status: 400 });
    }

    if (!mileage) {
      return new NextResponse("mileage URL is required", { status: 400 });
    }

    if (!capicity) {
      return new NextResponse("capicity URL is required", { status: 400 });
    }

    if (!transmission) {
      return new NextResponse("transmission is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("price is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("category id is required", { status: 400 });
    }

    if (!images) {
      return new NextResponse("images is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    if (!params.carId) {
      return new NextResponse("Car Id is ie required", { status: 400 });
    }
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const car = await prismadb.car.update({
      where: {
        id: params.carId,
      },
      data: {
        model,
        description,
        mileage,
        capicity,
        transmission,
        isAvailable,
        price,
        categoryId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });
    return NextResponse.json(car);
  } catch (error) {
    console.log("[CAR_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
