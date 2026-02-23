import { UserType } from "@/types/UserType";
import { Pencil, Trash2 } from "lucide-react";

export default function UserInternalCard({
  data,
  handleEdit,
  handleDelete,
}: {
  data: UserType;
  handleEdit?: (data: UserType) => void;
  handleDelete?: (data: UserType) => void;
}) {
  if (!data.Username && !data.Email) {
    console.warn("UserInternalCard received empty data:", data);
  }

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

      {/* Foto Profil */}
      <img
        src={data.PasphotoLink || "/default-user.png"}
        alt={data.PegawaiName}
        className="
          w-20 h-20 sm:w-16 sm:h-16
          rounded-full object-cover border border-gray-300 dark:border-gray-600
          mx-auto sm:mx-0
        "
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/default-user.png";
        }}
      />

      {/* Info */}
      <div className="flex-1 text-center sm:text-left w-full">
        {/* Name + Status */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start pr-8 sm:pr-10">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-1 justify-center sm:justify-start">
            <span className="bx bx-user"></span>
            {data.PegawaiName || data.Username}
          </h2>

          <span
            className={`
              text-xs px-2 py-1 rounded-full mt-1 sm:mt-0 self-center sm:self-auto
              ${
                data.IsAktif === "y"
                  ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-white"
                  : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-white"
              }
            `}
          >
            {data.IsAktif === "y" ? "Aktif" : "Nonaktif"}
          </span>
        </div>

        {/* NIP + Email */}
        <div
          className="
          flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2
          text-gray-600 dark:text-gray-300 text-sm
        "
        >
          {data.Username && (
            <p className="flex items-center gap-1 justify-center sm:justify-start">
              <span className="bx bx-id-card"></span>
              {data.Username}
            </p>
          )}

          {data.Email && (
            <p className="flex items-center gap-1 justify-center sm:justify-start">
              <span className="bx bx-envelope"></span>
              {data.Email}
            </p>
          )}

          {!data.Username && !data.Email && (
            <p className="text-xs text-gray-400 italic">
              No contact info available
            </p>
          )}
        </div>

        {/* Group */}
        {data.GroupName && (
          <div className="flex justify-center sm:justify-start">
            <span
              className="
              bg-amber-100 text-amber-700 dark:bg-amber-700 dark:text-white
              px-2 py-1 text-xs rounded-md mt-3
            "
            >
              Group {data.GroupName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
