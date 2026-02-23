"use client";
import React from "react";
import axiosClient from "@/lib/axiosCLient";
import { useModul } from "@/store/useModul";
import { ModulType } from "@/types/ModulType";
import { useQuery } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, ChevronDown, Menu as MenuIcon } from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const MenuLink = ({ href, name, iconClass, isCollapsed, isActive }: any) => (
  <Link
    href={href}
    className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl mb-1 transition-all duration-300 font-bold text-[13px]
      ${isActive ? "bg-white text-[#6C5DD3] shadow-lg shadow-purple-500/10 scale-[1.02]" : "text-white/60 hover:bg-white/10 hover:text-white"}
      ${isCollapsed ? "justify-center px-2" : ""}`}
  >
    <i className={`${iconClass} text-xl shrink-0`}></i>
    {!isCollapsed && (
      <span className="whitespace-nowrap tracking-wide">{name}</span>
    )}
  </Link>
);

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { modul, setModul }: any = useModul();

  const getModul = async () => {
    try {
      const res = await axiosClient.post(
        "/api/modul/getModulesAccess",
        { group_id: session?.user?.groupId, asal_sistem: "language_center" },
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        },
      );

      if (res.status === 200) {
        const baseData = Array.isArray(res.data.data) ? res.data.data : [];
        const mappedBaseData = baseData.map((m: any) => ({
          modul_id: m.ModulId || m.modul_id,
          modul_name: m.ModulName || m.modul_name,
          modul_link: m.ModulLink || m.modul_link,
          modul_icon: m.ModulIcon || m.modul_icon,
          modul_main_menu: m.ModulMainMenu || m.modul_main_menu,
          sub_menu:
            (m.SubMenu || m.sub_menu)?.map((sub: any) => ({
              modul_id: sub.ModulId || sub.modul_id,
              modul_name: sub.ModulName || sub.modul_name,
              modul_link: sub.ModulLink || sub.modul_link,
              modul_icon: sub.ModulIcon || sub.modul_icon,
            })) || null,
        }));

        const data = [
          {
            modul_id: 1,
            modul_name: "Dashboard",
            modul_link: "/dashboard",
            modul_icon: "bx bx-grid-alt",
            modul_main_menu: 0,
            sub_menu: null,
          },
          ...mappedBaseData,
        ];
        setModul(data);
        return data;
      }
      return [];
    } catch (error) {
      return [];
    }
  };

  useQuery({
    queryKey: ["modul-access"],
    queryFn: getModul,
    enabled: status === "authenticated",
  });

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-[#6C5DD3] flex flex-col z-50 shadow-2xl transition-all duration-500 overflow-x-hidden ${isCollapsed ? "w-20" : "w-72"}`}
    >
      <div
        className={`flex items-center h-24 mb-4 ${isCollapsed ? "justify-center" : "px-8 justify-between"}`}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-lg">
              <img
                src="/logo/logo-uib.png"
                alt="UIB"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col text-white">
              <span className="text-lg font-black tracking-tighter leading-none">
                UCLC
              </span>
              <span className="text-[9px] font-bold opacity-40 uppercase tracking-widest">
                System
              </span>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="bg-white/10 text-white hover:bg-white hover:text-[#6C5DD3] transition-all p-2 rounded-xl focus:outline-none"
        >
          <MenuIcon size={20} />
        </button>
      </div>

      {/* PROFILE SECTION */}
      <div
        className={`mx-4 mb-8 p-3 rounded-[2rem] bg-white/5 border border-white/10 flex items-center gap-4 transition-all duration-500 ${isCollapsed ? "justify-center bg-transparent border-none" : ""}`}
      >
        <div
          className={`relative rounded-2xl bg-white p-0.5 shrink-0 shadow-xl overflow-hidden ${isCollapsed ? "w-10 h-10" : "w-12 h-12"}`}
        >
          <img
            src={session?.user?.avatar || "/logo/user.png"}
            alt="User"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col overflow-hidden text-white">
            <span className="text-xs font-black truncate uppercase">
              {session?.user?.nama || "Admin Account"}
            </span>
            <span className="text-[9px] font-bold opacity-40 uppercase tracking-widest">
              {session?.user?.groupName || "Authorized Access"}
            </span>
          </div>
        )}
      </div>

      <nav className="flex-1 px-4 overflow-y-auto custom-scrollbar space-y-1">
        {modul.map((mdl: ModulType) => {
          const hasSub = mdl.sub_menu && mdl.sub_menu.length > 0;
          const isActive =
            pathname === mdl.modul_link ||
            pathname.startsWith(mdl.modul_link + "/");

          if (!hasSub) {
            return (
              <MenuLink
                key={mdl.modul_id}
                href={mdl.modul_link || "#"}
                name={mdl.modul_name}
                iconClass={mdl.modul_icon}
                isCollapsed={isCollapsed}
                isActive={isActive}
              />
            );
          }

          return (
            <div key={mdl.modul_id} className="mb-1">
              {!isCollapsed ? (
                <details
                  className="group"
                  open={mdl.sub_menu?.some(
                    (sub: any) => pathname === sub.modul_link,
                  )}
                >
                  <summary
                    className={`flex items-center justify-between px-4 py-3.5 rounded-2xl cursor-pointer list-none transition-all group-hover:shadow-md ${
                      isActive
                        ? "text-white bg-white/15 shadow-md"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <i className={`${mdl.modul_icon} text-xl transition-transform group-open:scale-110`}></i>
                      <span className="text-[13px] font-bold tracking-wide">
                        {mdl.modul_name}
                      </span>
                    </div>
                    <ChevronDown
                      size={16}
                      className="transition-all duration-300 group-open:rotate-180 opacity-50 group-hover:opacity-100"
                    />
                  </summary>
                  <div className="pl-8 pr-2 py-2 space-y-1.5">
                    {mdl.sub_menu?.map((sub: any) => {
                      const isSubActive = pathname === sub.modul_link;
                      return (
                        <Link
                          key={sub.modul_id}
                          href={sub.modul_link}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-bold transition-all group ${
                            isSubActive
                              ? "text-white bg-white/20 shadow-md"
                              : "text-white/50 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full transition-all ${
                            isSubActive ? "bg-white" : "bg-white/30 group-hover:bg-white/60"
                          }`}></span>
                          <span className="truncate">{sub.modul_name}</span>
                          {sub.modul_icon && (
                            <i className={`${sub.modul_icon} text-sm ml-auto opacity-60 group-hover:opacity-100 transition-opacity`}></i>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </details>
              ) : (
                <div
                  className="flex justify-center py-3.5 text-white/60 hover:text-white"
                  title={mdl.modul_name}
                >
                  <i className={`${mdl.modul_icon} text-xl`}></i>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5 mt-auto">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className={`flex items-center gap-4 px-4 py-4 text-white/60 hover:text-white transition-all w-full rounded-2xl hover:bg-red-500/20 group ${isCollapsed ? "justify-center" : ""}`}
        >
          <LogOut size={20} className="group-hover:text-red-400" />
          {!isCollapsed && (
            <span className="text-[11px] font-black uppercase tracking-widest">
              Sign Out
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
