import { deleteUser } from "@/service/user.service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteUser(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, userId }: any) => deleteUser(token, userId),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menghapus pengguna"),
  });
}
