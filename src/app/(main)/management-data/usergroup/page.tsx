"use client";
import LoadingPermission from "@/components/layout/LoadingPermission";
import NotAllowedPage from "@/components/layout/NotAllowedPage";
import { useModul } from "@/store/useModul";
import { checkModulePermission } from "@/utils/checkModulePermission";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import UsergroupView from "./view/UsergroupView";

export default function Usergroup() {
  const { modul }: any = useModul();
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const checkPermission = async () => {
    const modulPath = pathname;

    const perm = await checkModulePermission(modul, modulPath);

    return perm;
  };

  const {
    data: permission,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["permission", pathname],
    queryFn: () => checkPermission(),
    enabled: modul.length > 0 && status === "authenticated",
    refetchOnMount: true,
  });

  return !isLoading && isFetched ? (
    <>{permission ? <UsergroupView /> : <NotAllowedPage />}</>
  ) : (
    <LoadingPermission />
  );
}
