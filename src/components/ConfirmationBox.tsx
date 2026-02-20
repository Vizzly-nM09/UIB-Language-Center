"use client";

import { useConfirmation } from "@/store/useConfirmationBox";

export default function ConfirmationBox() {
  const { open, options, confirm, cancel } = useConfirmation();

  if (!open || !options) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur">
      <div className="bg-white dark:bg-[#212121] rounded-lg p-6 shadow-xl max-w-sm w-full mx-4">
        <div className="flex flex-col items-center text-center space-y-3">
          <i className={`bx bx-${options.icon ?? "help-circle"} text-4xl`} />

          <h2 className="font-bold text-lg">{options.title}</h2>

          <p className="text-sm">{options.message}</p>

          <div className="flex gap-3 w-full mt-4">
            {options.showCancelButton !== false && (
              <button
                className="flex-1 px-4 py-2 rounded-lg bg-gray-200 dark:bg-[#171717] cursor-pointer"
                onClick={cancel}
              >
                {options.cancelButtonText ?? "Batal"}
              </button>
            )}

            <button
              className={`flex-1 px-4 py-2 rounded-lg text-white cursor-pointer ${
                options.confirmButtonColor ?? "bg-red-600"
              }`}
              onClick={confirm}
            >
              {options.confirmButtonText ?? "Ya"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
