"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { UserType } from "@/types/UserTypes";
import { UsergroupType } from "@/types/UsergroupTypes";
import { useUserData } from "@/hooks/user/useUserData";
import { useUsergroupData } from "@/hooks/Usergroup/useUsergroupData";
import { useCreateUser } from "@/hooks/user/useCreateUser";
import { useEditUser } from "@/hooks/user/useEditUser";
import { useDeleteUser } from "@/hooks/user/useDeleteUser";
import { useConfirmation } from "@/store/useConfirmationBox";

export default function UserView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  // --- LOGIC PRESERVED ---
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    usergroup: "",
    isAktif: "",
  });

  const { data, isLoading, refetch } = useUserData(session?.user?.accessToken, status);
  const { data: dataUsergroup } = useUsergroupData(session?.user?.accessToken, status);

  const { mutate: createUserMutation } = useCreateUser(
    () => { showNotification({ status: "text-green-500", icon: "bx bx-check", header: "Berhasil", message: "User berhasil ditambahkan" }); refetch(); setUser({ username: "", email: "", usergroup: "", isAktif: "" }); },
    (msg) => { showNotification({ status: "text-red-500", icon: "bx bx-error", header: "Gagal", message: msg }); }
  );

  const { mutate: updateUserMutation } = useEditUser(
    () => { showNotification({ status: "text-green-500", icon: "bx bx-check", header: "Berhasil", message: "User berhasil diperbarui" }); refetch(); setIsEditing(false); setUser({ username: "", email: "", usergroup: "", isAktif: "" }); },
    (msg) => { showNotification({ status: "text-red-500", icon: "bx bx-error", header: "Gagal", message: msg }); }
  );

  const { mutate: deleteUserMutation } = useDeleteUser(
    () => { showNotification({ status: "text-green-500", icon: "bx bx-check", header: "Berhasil", message: "User berhasil dihapus" }); refetch(); },
    (msg) => { showNotification({ status: "text-red-500", icon: "bx bx-error", header: "Gagal", message: msg }); }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { token: session?.user?.accessToken, user: { username: user.username, email: user.email, groupId: Number(user.usergroup), isAktif: user.isAktif } };
    !isEditing ? createUserMutation(payload) : updateUserMutation(payload);
  };

  const handleEdit = (data: UserType) => {
    setIsEditing(true);
    setUser({ username: data.Username, email: data.Email, usergroup: String(data.GroupId), isAktif: data.IsAktif });
  };

  const handleDelete = (data: UserType) => {
    showConfirmation({ 
      title: "Hapus Pengguna?", 
      message: "Tindakan ini permanen. Lanjutkan?", 
      icon: "trash", 
      confirmButtonText: "Hapus", 
      confirmButtonColor: "bg-red-600", 
      onConfirm() { deleteUserMutation({ token: session?.user?.accessToken, userId: data.Username }); } 
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black tracking-tighter text-gray-900">User Management</h1>
        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
            <Link href="/dashboard" className="hover:text-[#6C5DD3] transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-[#6C5DD3]">Accounts</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-8 border border-gray-100/50">
            <input
              type="text"
              placeholder="Search user..."
              className="w-full px-6 py-4 bg-[#F8F9FC] border-none rounded-2xl mb-8 text-sm font-bold focus:ring-4 focus:ring-[#6C5DD3]/10 transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <DataTable columns={columns} data={data || []} searchQuery={searchTerm} isLoading={isLoading} refetch={refetch} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>

        <div className="lg:col-span-1 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-8 border border-gray-100/50 sticky top-8">
          <h2 className="text-xl font-black mb-8 text-gray-900">{isEditing ? "Modify" : "Create"} Account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
             <div className="relative group">
                <input type="text" required disabled={isEditing} value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className="peer w-full rounded-2xl border-2 border-gray-100 px-4 pt-5 pb-2 text-sm font-bold focus:border-[#6C5DD3] focus:outline-none focus:ring-4 focus:ring-[#6C5DD3]/10 bg-white transition-all" placeholder=" " />
                <label className="absolute left-4 top-4 text-xs font-bold text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-[#6C5DD3] -translate-y-3 scale-75 origin-[0]">Username / NIP</label>
             </div>
             <div className="relative group">
                <input type="email" required value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="peer w-full rounded-2xl border-2 border-gray-100 px-4 pt-5 pb-2 text-sm font-bold focus:border-[#6C5DD3] focus:outline-none focus:ring-4 focus:ring-[#6C5DD3]/10 bg-white transition-all" placeholder=" " />
                <label className="absolute left-4 top-4 text-xs font-bold text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-[#6C5DD3] -translate-y-3 scale-75 origin-[0]">Email Address</label>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Usergroup Access</label>
                <select required value={user.usergroup} onChange={(e) => setUser({ ...user, usergroup: e.target.value })} className="w-full px-4 py-3.5 border-2 rounded-2xl border-gray-100 focus:border-[#6C5DD3] outline-none text-sm font-bold appearance-none bg-white cursor-pointer transition-all">
                   <option value="" disabled>Select Role...</option>
                   {(dataUsergroup || []).map((ug: UsergroupType) => <option key={ug.group_id} value={ug.group_id}>{ug.group_name}</option>)}
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Account Status</label>
                <select required value={user.isAktif} onChange={(e) => setUser({ ...user, isAktif: e.target.value })} className="w-full px-4 py-3.5 border-2 rounded-2xl border-gray-100 focus:border-[#6C5DD3] outline-none text-sm font-bold appearance-none bg-white cursor-pointer transition-all">
                   <option value="" disabled>Choose Status...</option>
                   <option value="y">AKTIF</option>
                   <option value="n">NON-AKTIF</option>
                </select>
             </div>
             <div className="flex gap-2 pt-4">
                <button type="button" onClick={() => { setIsEditing(false); setUser({ username: "", email: "", usergroup: "", isAktif: "" }); }} className="flex-1 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest hover:text-red-500 transition-all">Reset</button>
                <button type="submit" className="flex-[2] py-4 bg-gradient-to-r from-[#6C5DD3] to-[#8E7EFF] text-white font-black text-[10px] rounded-2xl shadow-lg shadow-purple-100 uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all">
                    {isEditing ? "Save Changes" : "Create Account"}
                </button>
             </div>
          </form>
        </div>
      </div>
    </div>
  );
}