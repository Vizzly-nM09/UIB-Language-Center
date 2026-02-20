import { Layout, Pencil, Trash2 } from "lucide-react";
import { UsergroupType } from "@/types/UsergroupTypes";
import Link from "next/link";

export default function UserGroupCard({
  data,
  handleEdit,
  handleDelete,
}: {
  data: UsergroupType;
  handleEdit?: (data: UsergroupType) => void;
  handleDelete?: (data: UsergroupType) => void;
}) {
  return (
    <div
      className="
      w-full rounded-xl border border-gray-200 dark:border-gray-700
      bg-white dark:bg-gray-900 shadow-sm p-4
      hover:shadow-md transition-all relative
      flex flex-col sm:flex-row items-center sm:items-start gap-4
    "
    >
      {/* Action Buttons */}
      <div className="absolute bottom-3 right-3 flex gap-2">
        <Link
          href={`/management-data/usergroup/set-modul/${data.group_id}/${data.group_name}`}
          className="p-1.5 rounded-md hover:bg-amber-100 dark:hover:bg-amber-800 transition"
        >
          <Layout className="w-4 h-4 text-amber-600 dark:text-amber-300" />
        </Link>
        <button
          onClick={() => handleEdit && handleEdit(data)}
          className="p-1.5 rounded-md hover:bg-blue-100 dark:hover:bg-blue-800 transition"
        >
          <Pencil className="w-4 h-4 text-blue-600 dark:text-blue-300" />
        </button>
        <button
          onClick={() => handleDelete && handleDelete(data)}
          className="p-1.5 rounded-md hover:bg-red-100 dark:hover:bg-red-800 transition"
        >
          <Trash2 className="w-4 h-4 text-red-600 dark:text-red-300" />
        </button>
      </div>

      {/* Icon */}
      <div className="border border-gray-200 rounded-full w-20 h-20 sm:w-16 sm:h-16 flex items-center justify-center">
        <span className="bx bxs-user-badge text-4xl text-gray-400"></span>
      </div>

      {/* Info */}
      <div className="flex-1 text-center sm:text-left w-full">
        {/* Nama Group */}
        <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-1 justify-center sm:justify-start">
          <span className="bx bx-group"></span>
          {data.group_name}
        </h2>

        {/* Level */}
        <div className="flex justify-center sm:justify-start mt-2">
          <span
            className={`px-2 py-1 text-xs rounded-md 
            ${
              data.group_level === "admin"
                ? "bg-rose-100 text-rose-700"
                : "bg-indigo-100 text-indigo-700"
            }`}
          >
            {data.group_level.toUpperCase()}
          </span>
        </div>

        {/* Keterangan */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-3 text-center sm:text-left">
          {data.keterangan_group || "-"}
        </p>
      </div>
    </div>
  );
}
