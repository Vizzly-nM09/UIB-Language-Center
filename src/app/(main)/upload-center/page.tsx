"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import UploadTemplate from "@/components/ui/UploadTemplate";

export default function UploadCenterPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  // KONFIGURASI KONTEN BERDASARKAN TIPE
  const renderContent = () => {
    // Definisi template yang sama untuk semua case
    const sharedTemplate = {
      templateName: "Format Upload Tes Inggris.xlsx",
      templateUrl: "/templates/Format Upload Tes Inggris.xlsx",
      // Menggunakan satu endpoint utama dengan query param sebagai pembeda
      baseEndpoint: "/api/upload",
    };

    switch (type) {
      case "pegawai":
        return (
          <UploadTemplate
            title="Upload Score Pegawai"
            description="Gunakan template yang disediakan untuk mengunggah nilai bahasa Inggris pegawai."
            apiEndpoint={`${sharedTemplate.baseEndpoint}?type=pegawai`}
            templateName={sharedTemplate.templateName}
            templateUrl={sharedTemplate.templateUrl}
          />
        );

      case "mandarin":
        return (
          <UploadTemplate
            title="Upload Score Mandarin"
            description="Impor data nilai Mandarin (HSK Level 1-6) menggunakan template Excel."
            apiEndpoint={`${sharedTemplate.baseEndpoint}?type=mandarin`}
            templateName={sharedTemplate.templateName}
            templateUrl={sharedTemplate.templateUrl}
          />
        );

      case "test":
      default:
        return (
          <UploadTemplate
            title="Upload Student Test Scores"
            description="Silakan download template dan isi kolom nilai mahasiswa dengan benar."
            apiEndpoint={`${sharedTemplate.baseEndpoint}?type=test`}
            templateName={sharedTemplate.templateName}
            templateUrl={sharedTemplate.templateUrl}
          />
        );
    }
  };

  return <>{renderContent()}</>;
}
