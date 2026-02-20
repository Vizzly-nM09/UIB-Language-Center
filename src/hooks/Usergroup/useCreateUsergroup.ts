import { createUsergroup } from "@/service/usergroup.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateUsergroup(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, usergroup }: any) =>
      createUsergroup(token, usergroup),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menambahkan usergroup"),
  });
}
