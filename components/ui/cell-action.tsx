"use client";

import { BillboardColumn } from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/columns";
import { Button } from "./button";
import { toast } from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

interface CellActionProps {
  data: BillboardColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const  onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("Billboard Id copied to clipboard")
    }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <span className="sr-only">open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onCopy(data.id)}> 
            <Copy className="h-4 w-4 mr-2" />
             copy Id
        </DropdownMenuItem>
        <DropdownMenuItem> 
            <Edit className="h-4 w-4 mr-2" />
             Update
        </DropdownMenuItem>
        <DropdownMenuItem >
            <Trash className="h-4 w-4 mr-2" />
             Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
