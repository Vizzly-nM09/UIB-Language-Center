import { useModul } from "@/store/useModul";
import { signOut } from "next-auth/react";

export const handleLogout = async () => {
  useModul.getState().clearModul();
  useModul.persist.clearStorage();

  await signOut({ callbackUrl: "/" });
};
