"use client";
import { useState } from "react";
import { BillboardColumn } from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/columns";
import { Button } from "./button";
import { toast } from "react-hot-toast";
import axios from "axios";
import AlertModal from "../modals/alert-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface CellActionProps {
  data: BillboardColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const router = useRouter()
    const params = useParams()
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);


    const  onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("Billboard Id copied to clipboard")
    }
  
    const onDelete = async () => {
      try {
        setLoading(true);
        await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
        toast.success("Billboard deleted");
        router.push(`/${params.storeId}/billboards`)
        router.refresh();
      } catch (error) {
        toast.error("Make sure you delete categories using this billboards.");
      } finally {
        setLoading(false);
        setOpen(false)
      }
    };
  return (
    <>
      <AlertModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={onDelete}
          loading={loading}
        />
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
          <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}> 
              <Edit className="h-4 w-4 mr-2" />
              Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash className="h-4 w-4 mr-2" />
              Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
