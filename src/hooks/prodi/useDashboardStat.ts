import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/lib/axiosCLient";

export function useDashboardStats(token: string | undefined, status: string, filters: { prodi: string; tahun: string }) {
  return useQuery({
    queryKey: ["dashboard-score", filters],
    queryFn: async () => {
      const res = await axiosClient.get("/api/dashboard/get-score", {
        params: {
          selProdi: filters.prodi, // Jika "", backend diharapkan mengembalikan semua prodi
          selAngkatan: filters.tahun
        },
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data.data;
    },
    // Fetch berjalan selama tahun sudah dipilih, prodi boleh kosong (Semua Prodi)
    enabled: status === "authenticated" && !!token && !!filters.tahun,
  });
}