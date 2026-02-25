import { ModulType } from "@/types/ModulType";
import { UserType } from "@/types/UserType";
import { Pencil, Trash2 } from "lucide-react";

export default function ModulCard({
  data,
  handleEdit,
  handleDelete,
}: {
  data: ModulType;
  handleEdit?: (data: ModulType) => void;
  handleDelete?: (data: ModulType) => void;
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

      {/* Icon*/}
      <div className="border border-gray-200 rounded-full w-20 h-20 sm:w-16 sm:h-16 flex flex-row items-center justify-center">
        <span className={`bx ${data.modul_icon} text-4xl text-gray-400`}></span>
      </div>

      {/* Info */}
      <div className="flex-1 text-center sm:text-left w-full">
        {/* Name + Status */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start pr-8 sm:pr-10">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-1 justify-center sm:justify-start">
            <span className="bx bx-layout"></span>
            {data.modul_name}
          </h2>
        </div>

        {/* NIP + Email */}
        <div
          className="
          flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2
          text-gray-600 dark:text-gray-300 text-sm
        "
        >
          <p className="flex items-center gap-1 justify-center sm:justify-start">
            <span className="bx bx-code-curly"></span>
            {data.modul_link}
          </p>
        </div>

        {/* Group */}
        <div className="flex justify-center sm:justify-start">
          <span
            className={`${
              Number(data.modul_main_menu) === 0
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            } px-2 py-1 text-xs rounded-md mt-3`}
          >
            {data.modul_main_menu === "0" ? "Main menu" : "Sub modul"}
          </span>
        </div>
      </div>
    </div>
  );
}
