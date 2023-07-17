import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function Post(
    request: Request,
    { params }: {params: {storeId: string}}
    
    ) {
    try {

        const {userId} = auth()

        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // const billboard = await prismadb.billboard.create({
        //     // data: {
        //     //     //storeId
        //     // }
        // })

    } catch (error) {
        console.log("[BILLBOARDS_POST]", error);
        return new NextResponse("Internal_error", { status: 500 });
    }
}