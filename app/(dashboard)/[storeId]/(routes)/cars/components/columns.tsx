"use client"
import { Decimal } from "@prisma/client/runtime/library"
import { ColumnDef } from "@tanstack/react-table"


export type CarColumn = {
  id: string
  model: string
  mileage: Decimal
  capicity: string
  transmission: string
  isAvailable: Boolean
  description: string
  price: Decimal
  createdAt: string



}

export const columns: ColumnDef<CarColumn>[] = [
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "mileage",
    header: "Mileage",
  },
  {
    accessorKey: "capicity",
    header: "Capicity",
  },
  {
    accessorKey: "transmission",
    header: "Transmission",
  },
  {
    accessorKey: "isAvailable",
    header: "IsAvailable",
  },
  {
    accessorKey: "description",
    header: "Description"
  },
  {
    accessorKey: "price",
    header: "Price"
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },

//   {
//     id: "actions",
//     cell: ({ row }) => <CellAction data={row.original} />
//   }

]