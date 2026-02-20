import { editModulGroup } from "@/service/usergroup.service";
import { useMutation } from "@tanstack/react-query";

export function useEditModulGroup(
  onSuccess?: () => void,
  onError?: (msg: string) => void
) {
  return useMutation({
    mutationFn: ({ token, modulGroup }: any) =>
      editModulGroup(token, modulGroup),
    onSuccess,
    onError: (error: any) =>
      onError?.(error.response?.message ?? "Gagal mengedit modul group"),
  });
}
