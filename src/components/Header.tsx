"use client";
import { Menu, Search, Bell, HelpCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { UcFirst } from "@/utils/UcFirst";
import React from "react";

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const pathname = usePathname();

  // Memecah path URL untuk breadcrumb otomatis
  const pathParts = pathname.split("/").filter((p) => p && p !== "dashboard");

  return (
    <header className="sticky top-0 z-40 h-20 flex items-center px-8 justify-between bg-[#F3F4F6]/80 backdrop-blur-md border-b border-gray-200/50 transition-all duration-300">
      <div className="flex items-center gap-6 w-full max-w-4xl">
        {/* Dynamic Breadcrumbs / Page Title */}
        <div className="flex flex-col">
          <h2 className="text-sm font-black text-gray-900 uppercase tracking-tighter leading-none">
            {pathParts.length > 0
              ? UcFirst(pathParts[pathParts.length - 1])
              : "Dashboard Overview"}
          </h2>
          <div className="flex items-center gap-1.5 mt-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <span>UCLC System</span>
          </div>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        <button className="p-2.5 text-gray-400 hover:text-[#6C5DD3] hover:bg-white rounded-xl transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F3F4F6]" />
        </button>
        <button className="p-2.5 text-gray-400 hover:text-[#6C5DD3] hover:bg-white rounded-xl transition-all">
          <HelpCircle size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
