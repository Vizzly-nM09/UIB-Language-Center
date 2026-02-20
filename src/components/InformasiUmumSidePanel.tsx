"use client";

import { useConfirmation } from "@/store/useConfirmationBox";
import { Plus, Settings, Image, Info } from "lucide-react";
import Link from "next/link";

export default function InformasiUmumSidePanel({
  total = 0,
  active = 0,
  inactive = 0,
  lastUpdate = "-",
  onAdd,
  onSetting,
}: {
  total?: number;
  active?: number;
  inactive?: number;
  lastUpdate?: string;
  onAdd?: () => void;
  onSetting?: () => void;
}) {
  const showConfirmation = useConfirmation.getState().show;
  return (
    <aside className="w-full lg:w-[320px] space-y-4">
      {/* Ringkasan */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          📊 Ringkasan
        </h3>

        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Total Informasi</span>
            <span className="font-medium">{total}</span>
          </div>
          <div className="flex justify-between">
            <span>Aktif</span>
            <span className="text-green-600 font-medium">{active}</span>
          </div>
          <div className="flex justify-between">
            <span>Nonaktif</span>
            <span className="text-red-500 font-medium">{inactive}</span>
          </div>
          <div className="pt-2 text-xs text-gray-500">
            Update terakhir: {lastUpdate}
          </div>
        </div>
      </div>

      {/* Quick Action */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          ⚡ Aksi Cepat
        </h3>

        <div className="space-y-2">
          <Link
            href="informasi-umum/tambah-informasi"
            className="w-full flex items-center gap-2 rounded-lg bg-amber-100 px-3 py-2 text-sm text-amber-600 border border-amber-600 hover:bg-amber-600 hover:text-white transition"
          >
            <Plus size={16} />
            Tambah Informasi
          </Link>

          <button
            className="w-full flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
            onClick={() =>
              showConfirmation({
                title: "Fitur Belum Tersedia",
                message: "Mohon maaf, fitur ini masih dalam tahap pengembangan",
                icon: "bx bx-wrench",
                showCancelButton: false,
                confirmButtonText: "Ok",
                confirmButtonColor: "bg-amber-500",
              })
            }
          >
            <Image size={16} />
            Kelola Banner
          </button>

          <button
            onClick={() =>
              showConfirmation({
                title: "Fitur Belum Tersedia",
                message: "Mohon maaf, fitur ini masih dalam tahap pengembangan",
                icon: "bx bx-wrench",
                showCancelButton: false,
                confirmButtonText: "Ok",
                confirmButtonColor: "bg-amber-500",
              })
            }
            className="w-full flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            <Settings size={16} />
            Pengaturan Tampilan
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Info size={16} /> Tips
        </h3>

        <ul className="list-disc pl-4 space-y-1 text-sm text-gray-600">
          <li>Ukuran banner ideal: 1200 × 400 px</li>
          <li>Judul maksimal 60 karakter</li>
          <li>Konten aktif tampil di website PMB</li>
        </ul>
      </div>
    </aside>
  );
}
