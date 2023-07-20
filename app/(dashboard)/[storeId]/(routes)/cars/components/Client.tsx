"use client"
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { CarColumn, columns } from "./columns";

interface CarsClientProps {
    data: CarColumn[]
}

const CarsClient: React.FC<CarsClientProps>= ({
    data
}) => {
    const params = useParams()
    const router = useRouter()

  
  return (
<>
    <div className="flex items-center justify-between">
        <Heading
            title={`Cars (${data.length})`} 
            description="Manage cars for you store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/cars/new`)}> 
            <Plus className="mr-2 h-4 w-4"/>
                Add New
        </Button>
    </div>
    <Separator />

    <DataTable serachKey="model" columns={columns} data={data}/>
   </>
  )
}

export default CarsClient;