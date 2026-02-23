"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import UploadTemplate from "@/components/ui/UploadTemplate";

export default function UploadCenterPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type"); // Menangkap ?type=...

  // KONFIGURASI KONTEN BERDASARKAN TIPE
  const renderContent = () => {
    switch (type) {
      case "pegawai":
        return (
          <UploadTemplate
            title="Upload Score Pegawai"
            description="Make sure to use the correct Excel template for uploading employee scores."
            apiEndpoint="/api/v1/upload/score-pegawai"
            templateName="Format Import Nilai Inggris Pegawai.xlsx"
            templateUrl="/templates/template-pegawai.xlsx"
          />
        );

      case "mandarin":
        return (
          <UploadTemplate
            title="Upload Score Mandarin"
            description="Import data HSK (Level 1-6) with Excel Template."
            apiEndpoint="/api/v1/upload/score-mandarin"
            templateName="Format Import Nilai HSK.xlsx"
            templateUrl="/templates/template-mandarin.xlsx"
          />
        );

      case "test":
      default:
        return (
          <UploadTemplate
            title="Upload Student Test Scores"
            description="Download the Excel template and fill in the required fields."
            apiEndpoint="/v2/english-score/process-excel" // Update ke API Anda
            templateName="Template_Nilai_Mahasiswa.xlsx"
            templateUrl="/templates/template-score.xlsx"
          />
        );
    }
  };

  return <>{renderContent()}</>;
}
