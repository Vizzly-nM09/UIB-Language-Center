"use client";

import React, { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  CloudUpload,
  FileSpreadsheet,
  X,
  Download,
  CheckCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";

interface Props {
  title: string;
  description: string;
  apiEndpoint: string;
  templateName?: string;
  templateUrl?: string | null;
}

export default function UploadPageTemplate({
  title,
  description,
  templateName,
  templateUrl,
  apiEndpoint,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Ambil session untuk mendapatkan token akses
  const { data: session }: any = useSession();

  const handleDownload = () => {
    if (!templateUrl) return;
    const link = document.createElement("a");
    link.href = templateUrl;
    link.download = templateName || "template.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Template berhasil didownload!");
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Pilih file terlebih dahulu!");
      return;
    }
    setIsUploading(true);
    // Animasi progress bar (maksimal 90% sampai backend merespon)
    const interval = setInterval(
      () => setProgress((p) => (p >= 90 ? 90 : p + 5)),
      200,
    );

    try {
      // Siapkan file ke dalam FormData
      const formData = new FormData();
      formData.append("file", file);

      formData.append("sheet_name", "Sheet1");

      // Tembak endpoint internal Next.js (route.ts)
      const response = await axios.post(apiEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Sisipkan Token di sini agar tidak kena 401
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      });

      clearInterval(interval);
      setProgress(100);

      // Tampilkan pesan sukses dari respon backend
      toast.success(
        response.data.message || `Data ${title} berhasil diupload!`,
      );

      // Reset state form setelah sukses
      setTimeout(() => {
        setFile(null);
        setIsUploading(false);
        setProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }, 1000);
    } catch (error: any) {
      clearInterval(interval);
      setIsUploading(false);
      setProgress(0); // Reset progress karena gagal

      // Tangkap pesan error spesifik dari API internal atau backend
      const errorMsg =
        error.response?.data?.message ||
        "Gagal mengupload data. Pastikan format file sesuai.";
      toast.error(errorMsg);
      console.error("Upload Error:", error.response?.data || error.message);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.error("Upload dibatalkan");
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 scroll-smooth h-full text-gray-800">
      <Toaster position="top-right" />

      {/* 1. JUDUL & DESKRIPSI */}
      <div className="mb-8 animate-in fade-in slide-in-from-left-4 duration-700">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          {title}
        </h1>
        <p className="text-sm font-medium text-gray-500 mt-1">{description}</p>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        {/* 2. SECTION DOWNLOAD TEMPLATE */}
        {templateUrl && (
          <div className="bg-indigo-50/50 p-6 flex flex-col md:flex-row justify-between items-center border-b border-indigo-100 gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600 shadow-sm">
                <FileSpreadsheet size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Format Import Data</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Gunakan template <b>{templateName}</b> ini.
                </p>
              </div>
            </div>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-indigo-200 text-indigo-700 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-all active:scale-95 shadow-sm"
            >
              <Download size={16} /> Download Template
            </button>
          </div>
        )}

        <div className="p-8 md:p-12">
          {/* 3. AREA UPLOAD / PREVIEW */}
          {!file ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
              }}
              className="border-[3px] border-dashed border-gray-200 rounded-[2rem] p-12 flex flex-col items-center cursor-pointer hover:border-indigo-400 hover:bg-gray-50 transition-all group"
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".xlsx, .xls, .csv"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <div className="p-5 rounded-full bg-indigo-50 text-indigo-500 mb-6 group-hover:scale-110 transition-all shadow-sm">
                <CloudUpload size={48} />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Drag & Drop file Excel di sini
              </h4>
              <p className="text-sm text-gray-400">
                Atau klik untuk memilih file dari komputer
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 relative animate-in zoom-in-95 duration-300 shadow-sm">
              <button
                onClick={handleCancel}
                disabled={isUploading}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-white rounded-full"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center text-green-600 shadow-sm">
                  <FileSpreadsheet size={32} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-800 truncate pr-8 text-lg">
                    {file.name}
                  </h4>
                  {isUploading ? (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs font-bold mb-1 text-indigo-600">
                        <span>Mengupload...</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-indigo-500 h-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-green-600 font-bold mt-1.5 flex items-center gap-1.5">
                      <CheckCircle size={16} /> File siap diupload
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 4. TOMBOL AKSI (BATAL & UPLOAD DATA) */}
          <div className="mt-10 flex flex-col-reverse md:flex-row justify-end gap-4 border-t border-gray-100 pt-8">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isUploading || !file}
              className="px-8 py-3.5 font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleUpload}
              disabled={!file || isUploading}
              className={`px-10 py-3.5 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2.5 
                                ${!file || isUploading ? "bg-gray-300 cursor-not-allowed shadow-none text-gray-500" : "bg-[#6C5DD3] hover:bg-[#5b4eb8] active:scale-95 shadow-purple-500/20"}
                            `}
            >
              {isUploading ? "Memproses..." : "Upload Data"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
