"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ModulType } from "@/types/ModulType";

export const columns: ColumnDef<ModulType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [row.modul_name, row.modul_link, row.modul_icon].join(" ").toLowerCase(),
    header: () => null,
    cell: ({ row }) => null,
    enableHiding: true,
  },
  {
    id: "index",
    header: ({ table }) => (
      <div className="flex gap-3 items-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="border-black dark:border-white"
        />
        <button
          className="cursor-pointer"
          {...{
            onClick: table.getToggleAllRowsExpandedHandler(),
          }}
        >
          {table.getIsAllRowsExpanded() ? (
            <>
              <span className="bx bx-chevron-down text-xl text-black dark:text-white"></span>
            </>
          ) : (
            <>
              <span className="bx bx-chevron-right text-xl text-black dark:text-white"></span>
            </>
          )}
        </button>{" "}
        <div className="text-black dark:text-white font-bold">No</div>
      </div>
    ),
    cell: ({ row, getValue }) => (
      <>
        <div
          style={{
            paddingLeft: `${row.depth * 2}rem`,
          }}
        >
          <div className="flex gap-3 items-center">
            {row.getCanExpand() ? (
              <button
                className="cursor-pointer"
                {...{
                  onClick: row.getToggleExpandedHandler(),
                  style: { cursor: "pointer" },
                }}
              >
                {row.getIsExpanded() ? (
                  <>
                    <span className="bx bx-chevron-down text-xl text-black dark:text-white"></span>
                  </>
                ) : (
                  <>
                    <span className="bx bx-chevron-right text-xl text-black dark:text-white"></span>
                  </>
                )}
              </button>
            ) : (
              <>
                <span className="bx bx-chevron-right text-xl text-black dark:text-white opacity-0"></span>
              </>
            )}{" "}
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
              className="border-black dark:border-white"
            />
          </div>
        </div>
      </>
    ),
    size: 50,
  },
  {
    accessorKey: "modul_name",
    header: () => (
      <div className="text-black dark:text-white font-bold">Nama Modul</div>
    ),
  },
  {
    accessorKey: "modul_link",
    header: () => (
      <div className="text-black dark:text-white font-bold">URL</div>
    ),
  },
  {
    accessorKey: "modul_icon",
    header: () => (
      <div className="text-black dark:text-white font-bold">Ikon</div>
    ),
    cell: ({ row }) => {
      const icon = row.original.modul_icon;
      return (
        <>
          <span className={`${icon}`}></span> {icon}
        </>
      );
    },
  },
];
