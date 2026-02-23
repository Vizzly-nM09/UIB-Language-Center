"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/store/authStore";
import Sidebar from "@/components/layout/Sidebar";
import LoadingPermission from "@/components/layout/LoadingPermission";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useHelp } from "@/contexts/help-context";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const setToken = useAuthStore((state) => state.setToken);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { setCurrentPage } = useHelp();

  useEffect(() => {
    if (session?.user?.accessToken) {
      setToken(session.user.accessToken);
    }
  }, [session, setToken]);

  // Set current page for help system based on pathname
  useEffect(() => {
    // Extract page key from pathname
    // e.g., /dashboard -> dashboard, /management-data/user -> management-user
    const segments = pathname.split('/').filter(Boolean);
    let pageKey = 'dashboard';
    
    if (segments.length > 0) {
      if (segments[0] === 'dashboard') {
        pageKey = 'dashboard';
      } else if (segments[0] === 'score-test') {
        pageKey = 'score-test';
      } else if (segments[0] === 'upload-center') {
        pageKey = 'upload-center';
      } else if (segments.includes('management-data')) {
        if (segments.includes('user')) pageKey = 'management-user';
        else if (segments.includes('modul')) pageKey = 'management-modul';
        else if (segments.includes('usergroup')) pageKey = 'management-usergroup';
      }
    }
    
    setCurrentPage(pageKey);
  }, [pathname, setCurrentPage]);

  // FIX: Hanya loading jika NextAuth sedang mengecek session
  // Sidebar akan menangani loading menunya sendiri dengan skeleton
  if (status === "loading") {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#F3F4F6]">
        <LoadingPermission />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F3F4F6] overflow-x-hidden">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div className={cn(
        "flex-1 flex flex-col min-h-screen transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        isCollapsed ? "ml-20" : "ml-72"
      )}>
        <Header toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
        
        <main className="p-8 flex-1">
          {/* ANIMASI SETIAP HALAMAN */}
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}