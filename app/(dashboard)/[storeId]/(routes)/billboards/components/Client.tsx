"use client"

import Heading from "@/components/ui/Heading";
import { BillboardColumns, columns } from "../components/columns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";

interface BillboardClient {
    data: BillboardColumns[]
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
            title={`Billboards (${data.length})`} 
            description="Manage billnoards for you store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}> 
            <Plus className="mr-2 h-4 w-4"/>
                Add New
        </Button>
    </div>
    <Separator />

    <DataTable columns={columns} data={data}/>
   </>
  )
}

export default BillboardClient;