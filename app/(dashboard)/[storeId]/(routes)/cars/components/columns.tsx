"use client"
import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export type CarColumn = {
  id: string
  model: string
  mileage: string
  capicity: string
  transmission: string
  isAvailable: Boolean
  description: string
  price: string
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
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction />
  }

]