import { redirect } from "next/navigation";

export default function MainPage() {
  // Karena (main) adalah grup utama, kita otomatis melempar user ke halaman Dashboard
  redirect("/dashboard");
}
