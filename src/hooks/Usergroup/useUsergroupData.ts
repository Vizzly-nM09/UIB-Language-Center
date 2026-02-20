import { getUserData } from "@/service/user.service";
import { getUsergroupData } from "@/service/usergroup.service";
import { useQuery } from "@tanstack/react-query";

export const useUsergroupData = (token: string, status: string) =>
  useQuery({
    queryKey: ["usergroupData"],
    queryFn: () => getUsergroupData(token),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
