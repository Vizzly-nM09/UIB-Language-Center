import { createUser } from "@/service/user.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateUser(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, user }: any) => createUser(token, user),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menambahkan pengguna"),
  });
}
