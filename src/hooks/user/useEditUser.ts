import { editUser } from "@/service/user.service";
import { useMutation } from "@tanstack/react-query";

export function useEditUser(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, user }: any) => editUser(token, user),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengedit pengguna"),
  });
}
