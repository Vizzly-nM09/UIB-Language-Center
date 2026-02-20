"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useModulGroupData } from "@/hooks/Usergroup/useModulGroupData";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { ModulType } from "@/types/ModulType";
import { useEditModulGroup } from "@/hooks/Usergroup/useEditModulGroup";

export default function SetModulView({
  usergroupId,
  usergroupName,
}: {
  usergroupId: string;
  usergroupName: string;
}) {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  // --- LOGIC PRESERVED ---
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [usergroup, setUsergroup] = useState<ModulType[]>([]);
  const [selectedModul, setSelectedModul] = useState<{}>({});

  const { data, isLoading, refetch } = useModulGroupData(
    session?.user?.accessToken,
    usergroupId,
    status,
  );
  const { mutate: updateModulGroupMutation } = useEditModulGroup(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check",
        header: "Berhasil",
        message: "Hak akses dikonfigurasi",
      });
      refetch();
      setIsLoadingSubmit(false);
    },
    (msg) => {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error",
        header: "Gagal",
        message: msg,
      });
      setIsLoadingSubmit(false);
    },
  );

  const handleSubmit = async () => {
    updateModulGroupMutation({
      token: session?.user?.accessToken,
      modulGroup: {
        selected_modul: selectedModul,
        group_id: String(usergroupId),
      },
    });
    setIsLoadingSubmit(true);
  };

  const catchChangedModul = (selectedModul: {}) => {
    setSelectedModul(selectedModul);
  };
  useEffect(() => {
    if (data) setUsergroup(data.modulList);
  }, [data]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-black tracking-tighter text-gray-900">
            Configure Access
          </h1>
          <p className="text-[10px] font-black text-[#6C5DD3] uppercase tracking-[0.2em]">
            Group: {usergroupName}
          </p>
        </div>
        <Link
          href="/management-data/usergroup"
          className="px-6 py-3 bg-white text-gray-400 font-black text-[10px] rounded-2xl shadow-sm hover:text-black border border-gray-50 uppercase tracking-widest transition-all"
        >
          Go Back
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-8 border border-gray-100/50">
        <div className="flex flex-wrap gap-4 mb-8">
          <input
            type="text"
            placeholder="Find module..."
            className="flex-1 px-6 py-4 bg-[#F8F9FC] border-none rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-[#6C5DD3]/10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            disabled={isLoadingSubmit || isLoading}
            className="px-12 py-4 bg-gradient-to-r from-[#6C5DD3] to-[#8E7EFF] text-white font-black text-[10px] rounded-2xl shadow-lg shadow-purple-100 uppercase tracking-widest hover:scale-[1.05] active:scale-[0.95] transition-all disabled:opacity-50"
          >
            {isLoadingSubmit ? "Syncing..." : "Update Permission"}
          </button>
        </div>

        <DataTable
          columns={columns}
          data={usergroup || []}
          searchQuery={searchTerm}
          isLoading={isLoading || isLoadingSubmit}
          refetch={refetch}
          catchChangedModul={catchChangedModul}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
