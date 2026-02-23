"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { UsergroupType } from "@/types/UsergroupTypes";
import { useUsergroupData } from "@/hooks/Usergroup/useUsergroupData";
import { useCreateUsergroup } from "@/hooks/Usergroup/useCreateUsergroup";
import { useEditUsergroup } from "@/hooks/Usergroup/useEditUsergroup";
import { useDeleteUsergroup } from "@/hooks/Usergroup/useDeleteUsergroup";
import { useConfirmation } from "@/store/useConfirmationBox";

export default function UsergroupView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  // --- LOGIC PRESERVED ---
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [usergroup, setUsergroup] = useState({ 
    id: 0, 
    name: "",
    level: "",
    description: ""
  });

  const { data, isLoading, refetch } = useUsergroupData(
    session?.user?.accessToken,
    status,
  );
  const { mutate: createMutation } = useCreateUsergroup(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check",
        header: "Sukses",
        message: "Grup ditambahkan",
      });
      refetch();
      setUsergroup({ id: 0, name: "", level: "", description: "" });
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
  const { mutate: updateMutation } = useEditUsergroup(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check",
        header: "Sukses",
        message: "Grup diperbarui",
      });
      refetch();
      setIsEditing(false);
      setUsergroup({ id: 0, name: "", level: "", description: "" });
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
  const { mutate: deleteMutation } = useDeleteUsergroup(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check",
        header: "Sukses",
        message: "Grup dihapus",
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      token: session?.user?.accessToken,
      usergroup: { 
        id: usergroup.id, 
        name: usergroup.name,
        level: usergroup.level,
        description: usergroup.description
      },
    };
    !isEditing ? createMutation(payload) : updateMutation(payload);
  };

  const handleEdit = (data: UsergroupType) => {
    setIsEditing(true);
    setUsergroup({ 
      id: Number(data.group_id), 
      name: data.group_name,
      level: data.group_level || "",
      description: data.keterangan_group || ""
    });
  };
  const handleDelete = (data: UsergroupType) => {
    showConfirmation({
      title: "Hapus Group?",
      message: "Akses user di grup ini akan dicabut.",
      icon: "trash",
      confirmButtonText: "Hapus",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        deleteMutation({
          token: session?.user?.accessToken,
          usergroupId: data.group_id,
        });
      },
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black tracking-tighter text-gray-900">
          User Roles
        </h1>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
          Group Permission Management
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-8 border border-gray-100/50">
          <input
            type="text"
            placeholder="Search roles..."
            className="w-full px-6 py-4 bg-[#F8F9FC] border-none rounded-2xl mb-8 text-sm font-bold outline-none focus:ring-4 focus:ring-[#6C5DD3]/10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <DataTable
            columns={columns}
            data={data || []}
            searchQuery={searchTerm}
            isLoading={isLoading}
            refetch={refetch}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>

        <div className="lg:col-span-1 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-8 border border-gray-100/50 sticky top-8">
          <h2 className="text-xl font-black mb-8 text-gray-900">
            {isEditing ? "Edit" : "New"} Role
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Role Name
              </label>
              <input
                type="text"
                required
                value={usergroup.name}
                onChange={(e) =>
                  setUsergroup({ ...usergroup, name: e.target.value })
                }
                className="w-full rounded-2xl border-2 border-gray-50 px-4 py-3.5 text-sm font-bold focus:border-[#6C5DD3] transition-all"
                placeholder="e.g. Moderator"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Status Level
              </label>
              <select
                required
                value={usergroup.level}
                onChange={(e) =>
                  setUsergroup({ ...usergroup, level: e.target.value })
                }
                className="w-full rounded-2xl border-2 border-gray-50 px-4 py-3.5 text-sm font-bold focus:border-[#6C5DD3] transition-all"
              >
                <option value="">Select status...</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Description
              </label>
              <textarea
                value={usergroup.description}
                onChange={(e) =>
                  setUsergroup({ ...usergroup, description: e.target.value })
                }
                className="w-full rounded-2xl border-2 border-gray-50 px-4 py-3.5 text-sm font-bold focus:border-[#6C5DD3] transition-all resize-none"
                placeholder="Add a description..."
                rows={3}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#6C5DD3] to-[#8E7EFF] text-white font-black text-[10px] rounded-2xl shadow-lg shadow-purple-100 uppercase tracking-widest hover:scale-[1.02] transition-all"
            >
              {isEditing ? "Update Role" : "Confirm New Role"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setUsergroup({ id: 0, name: "", level: "", description: "" });
                }}
                className="w-full py-2 font-black text-[10px] text-gray-400 uppercase tracking-widest hover:text-red-500"
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
