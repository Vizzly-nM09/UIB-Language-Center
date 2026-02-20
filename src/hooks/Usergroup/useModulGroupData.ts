import { getModulGroup } from "@/service/usergroup.service";
import { useQuery } from "@tanstack/react-query";

export const useModulGroupData = (
  token: string,
  groupId: string,
  status: string
) =>
  useQuery({
    queryKey: ["modulGroupData", groupId],
    queryFn: () => getModulGroup(token, groupId),
    enabled: status === "authenticated",
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
