import { deleteUsergroup } from "@/service/usergroup.service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteUsergroup(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, usergroupId }: any) =>
      deleteUsergroup(token, usergroupId),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menghapus usergroup"),
  });
}
