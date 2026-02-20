"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useNotifikasi } from "@/store/useNotifikasi";

export default function Notifikasi() {
  const { visible, current } = useNotifikasi();

  if (!current) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="toast"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="alert"
          className="toast toast-top toast-end mt-20 rounded-xl border border-gray-100 dark:border-gray-800 bg-white p-4 w-72 md:w-96 mr-5 z-[60] shadow-lg dark:bg-[#171717] h-auto"
        >
          <div className="flex flex-row justify-center items-center gap-4">
            <span className={`${current.status}`}>
              <span className={`${current.icon}`}></span>
            </span>

            <div className="flex flex-col flex-1">
              <strong className="block text-sm font-medium text-gray-900 dark:text-white">
                {" "}
                {current.header}{" "}
              </strong>

              <p className="text-xs text-gray-600 dark:text-gray-300 w-72 md:w-full break-words whitespace-normal">
                {current.message}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
