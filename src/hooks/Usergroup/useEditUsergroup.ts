import { createUsergroup, editUsergroup } from "@/service/usergroup.service";
import { useMutation } from "@tanstack/react-query";

export function useEditUsergroup(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, usergroup }: any) => editUsergroup(token, usergroup),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengedit usergroup"),
  });
}
