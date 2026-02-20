"use client";

import { ModulType } from "@/types/ModulType";
import { ColumnDef } from "@tanstack/react-table";
import ModulCard from "@/components/ModulCard";

export const columns: ColumnDef<ModulType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [
        row.modul_name,
        row.modul_icon,
        row.modul_main_menu === "0" ? "Main Menu" : "Sub Menu",
        row.modul_main_menu === "0" ? "Main Modul" : "Sub Modul",
      ]
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
        <ModulCard
          data={row.original}
          handleEdit={meta.handleEdit}
          handleDelete={meta.handleDelete}
        />
      );
    },
  },
];
