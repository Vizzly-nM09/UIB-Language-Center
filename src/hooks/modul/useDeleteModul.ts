import { deleteModul } from "@/service/modul.service";
import { deleteUser } from "@/service/user.service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteModul(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, modulId }: any) => deleteModul(token, modulId),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menghapus modul"),
  });
}
