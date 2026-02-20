import { createModul } from "@/service/modul.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateModul(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, modul }: any) => createModul(token, modul),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal menambahkan modul"),
  });
}
