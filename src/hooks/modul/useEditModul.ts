import { editModul } from "@/service/modul.service";
import { useMutation } from "@tanstack/react-query";

export function useEditModul(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, modul }: any) => editModul(token, modul),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengedit modul"),
  });
}
