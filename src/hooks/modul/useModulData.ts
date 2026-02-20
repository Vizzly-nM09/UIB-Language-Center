import { getModulData } from "@/service/modul.service";
import { getUserData } from "@/service/user.service";
import { useQuery } from "@tanstack/react-query";

export const useModulData = (token: string, status: string) =>
  useQuery({
    queryKey: ["modulData"],
    queryFn: () => getModulData(token),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
