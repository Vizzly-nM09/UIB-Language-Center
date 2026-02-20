"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  FilterFn,
  Row,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import UserInternalCard from "@/components/UserInternalCard";
import UserInternalCardSkeleton from "@/components/UserInternalCardSkeleton";
import { UserType } from "@/types/UserTypes";

const globalFilterFn: FilterFn<any> = (
  row: Row<any>,
  columnId: string, // walaupun tidak dipakai, tetap harus ditulis
  filterValue: string
) => {
  const value = row.getValue("search") as string;

  if (!value) return false;

  return value.toLowerCase().includes(filterValue.toLowerCase());
};
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  refetch?: () => void;
  searchQuery?: string;
  handleDelete?: (data: UserType) => void;
  handleEdit?: (data: UserType) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  refetch,
  searchQuery,
  handleDelete,
  handleEdit,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: globalFilterFn,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
      columnVisibility: {
        search: false,
      },
    },
    state: {
      globalFilter,
    },
    meta: {
      handleDelete,
      handleEdit,
    },
  });

  React.useEffect(() => {
    if (searchQuery !== "") {
      setGlobalFilter(String(searchQuery));
    } else {
      setGlobalFilter("");
    }
  }, [searchQuery]);

  return (
    <div className="rounded-lg text-black dark:text-white shadow bg-white dark:bg-[#171717]">
      <Table>
        {/* <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader> */}
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length}>
                {[...Array(5)].map((_, index) => (
                  <UserInternalCardSkeleton key={index} />
                ))}
              </TableCell>
            </TableRow>
          ) : (
            <>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Data tidak ditemukan.
                    <div className="mt-2 flex justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex flex-row justify-center items-center gap-2"
                        onClick={() => refetch && refetch()}
                      >
                        <span className="bx bx-refresh text-lg"></span> Coba
                        Lagi
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4 gap-3 mr-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="dark:text-white dark:bg-[#212121]"
        >
          Sebelumnya
        </Button>
        <div className="font-medium text-slate-700 text-sm dark:text-white">
          Halaman {table.getState().pagination.pageIndex + 1} dari{" "}
          {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="dark:text-white dark:bg-[#212121]"
        >
          Berikutnya
        </Button>
        <select
          className="select select-bordered bg-transparent select-sm"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50, 100, 200].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Tampilkan {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
