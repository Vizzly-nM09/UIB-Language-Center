import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/lib/axiosCLient";

export const useProdiData = (token: string | undefined, status: string) => {
  return useQuery({
    queryKey: ["prodi-reference-list"],
    queryFn: async () => {
      const res = await axiosClient.get("/api/references/prodi-list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("useProdiData raw response:", res.data);

      // The proxy route returns { data: prodiNama }
      // But we need just the prodiNama object
      const prodiData = res.data?.data || res.data?.prodiNama || res.data || {};

      console.log("useProdiData extracted data:", prodiData);
      return prodiData;
    },
    enabled: status === "authenticated" && !!token,
    staleTime: 5 * 60 * 1000,
  });
};