"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { ModulType } from "@/types/ModulType";
import { useModulData } from "@/hooks/modul/useModulData";
import { useCreateModul } from "@/hooks/modul/useCreateModul";
import { useEditModul } from "@/hooks/modul/useEditModul";
import { useDeleteModul } from "@/hooks/modul/useDeleteModul";
import { useConfirmation } from "@/store/useConfirmationBox";

export default function ModulView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  // --- LOGIC PRESERVED ---
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modul, setModul] = useState({
    id: 0,
    name: "",
    link: "",
    icon: "",
    mainMenu: 0,
    urutan: "",
  });

  const { data, isLoading, refetch } = useModulData(
    session?.user?.accessToken,
    status,
  );
  const { mutate: createMutation } = useCreateModul(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check",
        header: "Sukses",
        message: "Modul ditambahkan",
      });
      refetch();
      setModul({
        id: 0,
        name: "",
        link: "",
        icon: "",
        mainMenu: 0,
        urutan: "",
      });
    },
    (msg) => {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error",
        header: "Gagal",
        message: msg,
      });
    },
  );
  const { mutate: updateMutation } = useEditModul(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check",
        header: "Sukses",
        message: "Modul diperbarui",
      });
      refetch();
      setIsEditing(false);
      setModul({
        id: 0,
        name: "",
        link: "",
        icon: "",
        mainMenu: 0,
        urutan: "",
      });
    },
    (msg) => {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error",
        header: "Gagal",
        message: msg,
      });
    },
  );
  const { mutate: deleteMutation } = useDeleteModul(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check",
        header: "Sukses",
        message: "Modul dihapus",
      });
      refetch();
    },
    (msg) => {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error",
        header: "Gagal",
        message: msg,
      });
    },
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      token: session?.user?.accessToken,
      modul: {
        modul_id: modul.id,
        modul_name: modul.name,
        modul_link: modul.link,
        modul_icon: modul.icon,
        modul_main_menu: modul.mainMenu,
        modul_urutan: Number(modul.urutan),
      },
    };

    !isEditing ? createMutation(payload) : updateMutation(payload);
  };

  const handleEdit = (data: ModulType) => {
    setIsEditing(true);
    setModul({
      id: Number(data.modul_id),
      name: data.modul_name,
      link: data.modul_link,
      icon: data.modul_icon,
      mainMenu: parseInt(data.modul_main_menu),
      urutan: data.modul_urutan,
    });
  };
  const handleDelete = (data: ModulType) => {
    showConfirmation({
      title: "Hapus Modul?",
      message: "Menu ini akan hilang dari navigasi.",
      icon: "trash",
      confirmButtonText: "Hapus",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        deleteMutation({
          token: session?.user?.accessToken,
          modulId: data.modul_id,
        });
      },
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black tracking-tighter text-gray-900">
          Module
        </h1>
        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
          <Link href="/dashboard" className="hover:text-[#6C5DD3]">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-[#6C5DD3]">Modul Setup</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-8 border border-gray-100/50">
          <input
            type="text"
            placeholder="Search modul..."
            className="w-full px-6 py-4 bg-[#F8F9FC] border-none rounded-2xl mb-8 text-sm font-bold focus:ring-4 focus:ring-[#6C5DD3]/10 transition-all outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <DataTable
            columns={columns as any}
            data={(data?.modulData as any) || []}
            searchQuery={searchTerm}
            isLoading={isLoading}
            refetch={refetch}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>

        <div className="lg:col-span-1 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-8 border border-gray-100/50 sticky top-8 h-fit">
          <h2 className="text-xl font-black mb-8 text-gray-900">
            {isEditing ? "Update" : "Add"} Modul
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Modul Name
              </label>
              <input
                type="text"
                required
                value={modul.name}
                onChange={(e) => setModul({ ...modul, name: e.target.value })}
                className="w-full rounded-2xl border-2 border-gray-50 px-4 py-3.5 text-sm font-bold focus:border-[#6C5DD3] transition-all"
                placeholder="e.g. Finance"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Link URL
              </label>
              <input
                type="text"
                required
                value={modul.link}
                onChange={(e) => setModul({ ...modul, link: e.target.value })}
                className="w-full rounded-2xl border-2 border-gray-50 px-4 py-3.5 text-sm font-bold focus:border-[#6C5DD3] transition-all"
                placeholder="/..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Boxicon Class
              </label>
              <input
                type="text"
                required
                value={modul.icon}
                onChange={(e) => setModul({ ...modul, icon: e.target.value })}
                className="w-full rounded-2xl border-2 border-gray-50 px-4 py-3.5 text-sm font-bold focus:border-[#6C5DD3] transition-all"
                placeholder="bx bx-home"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Order
              </label>
              <input
                type="number"
                required
                value={modul.urutan}
                onChange={(e) => setModul({ ...modul, urutan: e.target.value })}
                className="w-full rounded-2xl border-2 border-gray-50 px-4 py-3.5 text-sm font-bold focus:border-[#6C5DD3] transition-all"
                placeholder="Please input module order"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Module Type
              </label>
              <div className="relative group">
                <select
                  required
                  value={modul.mainMenu}
                  onChange={(e) =>
                    setModul({ ...modul, mainMenu: parseInt(e.target.value) })
                  }
                  className="w-full rounded-2xl border-2 border-gray-50 px-4 py-3.5 text-sm font-bold bg-white outline-none focus:border-[#6C5DD3] appearance-none transition-all cursor-pointer"
                >
                  {/* Opsi default untuk Modul Utama */}
                  <option value={0}>Main Menu (Parent)</option>

                  {/* Otomatis menampilkan daftar modul utama sebagai pilihan Parent untuk Sub Menu */}
                  {data?.mainMenuList?.map((m: any) => (
                    <option key={m.modul_id} value={m.modul_id}>
                      Sub Menu dari: {m.modul_name}
                    </option>
                  ))}
                </select>

                {/* Ikon panah kustom agar tampilan tetap premium dan konsisten */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-[#6C5DD3] transition-colors">
                  <i className="bx bx-chevron-down text-xl"></i>
                </div>
              </div>
              <p className="text-[9px] text-gray-400 ml-1 font-medium italic">
                *Pilih "Main Menu" jika ini adalah menu utama, atau pilih salah
                satu modul di atas untuk menjadikannya Sub-Menu.
              </p>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(true);
                  setModul({
                    id: 0,
                    name: "",
                    link: "",
                    icon: "",
                    mainMenu: 0,
                    urutan: "",
                  });
                }}
                className="flex-1 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest hover:text-black"
              >
                Reset
              </button>
              <button
                type="submit"
                className="flex-[2] py-4 bg-gradient-to-r from-[#6C5DD3] to-[#8E7EFF] text-white font-black text-[10px] rounded-2xl shadow-lg shadow-purple-100 uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {isEditing ? "Save Changes" : "Register Modul"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
