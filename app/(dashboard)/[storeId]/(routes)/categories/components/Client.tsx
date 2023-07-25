"use client"

import Heading from "@/components/ui/Heading";
import { CategoryColumn, columns } from "../components/columns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
interface CategoryClient {
    data: CategoryColumn[]
}

const CategoryClient: React.FC<CategoryClient> = ({
    data
}) => {
    const params = useParams()
    const router = useRouter()

  
  return (
<>
    <div className="flex items-center justify-between">
        <Heading
            title={`Categories (${data.length})`} 
            description="Manage ctaegories for you store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}> 
            <Plus className="mr-2 h-4 w-4"/>
                Add New
        </Button>
    </div>
    <Separator />
    <DataTable serachKey="name" columns={columns} data={data}/>
    <Heading title="API" description="API Calls for Categories"/>
    <Separator />
    <ApiList entityName="categories" entityIdName="categoryId"/>
   </>
  )
}

export default CategoryClient;