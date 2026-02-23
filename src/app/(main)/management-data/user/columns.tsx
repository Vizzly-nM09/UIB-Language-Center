"use client";

import UserInternalCard from "@/components/UserInternalCard";
import { UserType } from "@/types/UserType";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "next-auth";

export const columns: ColumnDef<UserType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [
        row.Email,
        row.PegawaiName,
        row.GroupName,
        row.Username,
        row.IsAktif === "y" ? "Aktif" : "Tidak Aktif",
      ]
        .join(" ")
        .toLowerCase(),
    header: () => null,
    enableHiding: true,
    cell: ({ row }) => null,
  },
  {
    id: "index",
    cell: ({ row, table }) => {
      const meta = table.options.meta as any;
      return (
        <UserInternalCard
          data={row.original}
          handleEdit={meta.handleEdit}
          handleDelete={meta.handleDelete}
        />
      );
    },
  },
];
