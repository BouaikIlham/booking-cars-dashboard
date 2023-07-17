"use client"

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface BillboardClient {
    data: Billboard[]
}

const BillboardClient: React.FC<BillboardClient> = ({
    data
}) => {
    const params = useParams()
    const router = useRouter()

  
  return (
<>
    <div className="flex items-center justify-between">
        <Heading
            title="Billboards (0)"
            description="Manage billnoards for you store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}> 
            <Plus className="mr-2 h-4 w-4"/>
                Add New
        </Button>
    </div>
    <Separator />

    {data.map((billboard) => (
        <div key={billboard.id}>
            <div>
                <h1>{billboard.label}</h1>
                <img  src={billboard.imageUrl}/>
            </div>
        </div>
    ))}
   </>
  )
}

export default BillboardClient;