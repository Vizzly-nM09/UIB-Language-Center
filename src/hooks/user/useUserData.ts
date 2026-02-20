import { getUserData } from "@/service/user.service";
import { useQuery } from "@tanstack/react-query";

export const useUserData = (token: string, status: string) =>
  useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(token),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
