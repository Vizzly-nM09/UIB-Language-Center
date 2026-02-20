"use client";

import { useEffect, useRef, useState } from "react";
import { ImageIcon, X } from "lucide-react";
import { useNotifikasi } from "@/store/useNotifikasi";

interface HeaderImageUploadProps {
  value?: File | null | string;
  onChange: (file: File | null) => void;
  maxSizeMB?: number;
}

export default function HeaderImageUpload({
  value,
  onChange,
  maxSizeMB = 3,
}: HeaderImageUploadProps) {
  const showNotification = useNotifikasi.getState().show;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  console.log("preview", preview);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "File Tidak Valid",
        message: "File harus berupa gambar",
      });
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "File Terlalu Besar",
        message: `File harus kurang dari ${maxSizeMB}MB`,
      });
      return;
    }

    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  useEffect(() => {
    return () => {
      if (preview && typeof preview !== "string") URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    if (!value) {
      setPreview(null);
    } else if (typeof value === "string") {
      setPreview(value);
    } else {
      setPreview(URL.createObjectURL(value));
    }
  }, [value]);

  return (
    <div>
      <div
        className={`relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition ${
          isDragging
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
          //   value={value ? undefined : ""}
        />

        {!preview ? (
          <>
            <ImageIcon className="mb-2 h-8 w-8 text-gray-400" />
            <p className="text-sm font-medium text-gray-700">
              Drag & drop gambar di sini
            </p>
            <p className="text-xs text-gray-500">
              atau klik untuk memilih file
            </p>
            <p className="mt-1 text-xs text-gray-400">
              PNG, JPG • max {maxSizeMB}MB
            </p>
          </>
        ) : (
          <div className="relative w-full">
            <img
              src={preview}
              alt="Preview"
              className="mx-auto max-h-48 rounded-md object-cover"
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPreview(null);
                onChange(null);
                inputRef.current!.value = "";
              }}
              className="absolute right-2 top-2 rounded-full bg-white p-1 text-gray-600 shadow hover:bg-gray-100"
              title="Hapus gambar"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
