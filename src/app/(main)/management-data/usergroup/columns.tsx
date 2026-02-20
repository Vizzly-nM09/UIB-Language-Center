"use client";

import { ColumnDef } from "@tanstack/react-table";
import UserGroupCard from "@/components/UsergroupCard";
import { UsergroupType } from "@/types/UsergroupTypes";

export const columns: ColumnDef<UsergroupType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [row.group_name, row.group_level, row.keterangan_group]
        .join(" ")
        .toLowerCase(),
    header: () => null,
    cell: ({ row }) => null,
    enableHiding: true,
  },
  {
    id: "index",
    cell: ({ row, table }) => {
      const meta = table.options.meta as any;
      return (
        <UserGroupCard
          data={row.original}
          handleEdit={meta.handleEdit}
          handleDelete={meta.handleDelete}
        />
      );
    },
  },
];
