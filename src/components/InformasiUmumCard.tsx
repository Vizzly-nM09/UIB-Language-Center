import Link from "next/link";
import { Pencil, Trash2, Eye } from "lucide-react";
import { InformasiUmumType } from "@/types/InformasiUmumTypes";
import { IndonesianDateFormat } from "@/utils/IndonesianDateFormat";

interface InformasiCardProps {
  data: InformasiUmumType;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
}

export function InformasiUmumCard({
  data,
  onEdit,
  onDelete,
  onView,
}: InformasiCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md transition col-span-3">
      {/* Header Image */}
      {data.header_gambar && (
        <div className="h-44 w-full overflow-hidden bg-gray-100">
          <img
            src={data.header_gambar}
            alt={data.judul_informasi}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Status */}
        <div className="mb-2 flex items-center justify-between">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              data.is_aktif === "y"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {data.is_aktif === "y" ? "Aktif" : "Non Aktif"}
          </span>

          <span className="text-xs text-gray-400">
            Dibuat pada: {IndonesianDateFormat(data.TanggalUpload)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {data.judul_informasi}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {data.keterangan_info || data.body_informasi}
        </p>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => onView && onView(data.id_informasi)}
            className="inline-flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-1.5 text-xs text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white hover:border-blue-500"
          >
            <Eye size={14} />
            Lihat Detail
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit && onEdit(data.id_informasi)}
              className="inline-flex items-center gap-1 rounded-lg bg-orange-100 px-3 py-1.5 text-xs text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white hover:border-orange-500"
            >
              <Pencil size={14} />
              Edit
            </button>

            <button
              onClick={() => onDelete && onDelete(data.id_informasi)}
              className="inline-flex items-center gap-1 rounded-lg bg-red-100 px-3 py-1.5 text-xs text-red-500 border border-red-500 hover:bg-red-500 hover:text-white hover:border-red-500"
            >
              <Trash2 size={14} />
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
