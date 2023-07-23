"use client";
import { ColumnDef } from "@tanstack/react-table";
export type OrderColumn = {
  id: string;
  address: string;
  phone: string;
  isPaid: boolean;
  totalPrice: string;
  cars: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "adress",
    header: "Adress",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "totalPrice",
    header: "TotalPrice",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
