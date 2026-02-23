import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ClientSessionProvider from "./clientSessionProvider";
import { ThemeProvider } from "./ThemeContext";
import Notifikasi from "@/components/Notifikasi";
import QueryProvider from "./QueryProvider";
import ConfirmationBox from "@/components/ConfirmationBox";
import { HelpProvider } from "@/contexts/help-context";
import { HelpModal, GuidedTour, HelpSidebar } from "@/components/help-system";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Universitas Internasional Batam - Prospective Student Registration Platform",
  description: "Sistem manajemen nilai tes Inggris mahasiswa UIB",
  icons: {
    icon: "/logo/uib.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* Tetap mempertahankan link Boxicons sesuai permintaan Anda */}
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider>
          <ClientSessionProvider>
            <HelpProvider>
              {/* QueryProvider membungkus children agar logic data-fetching berjalan global */}
              <QueryProvider>
                {children}
              </QueryProvider>
              
              {/* Komponen UI Global yang muncul di atas semua halaman */}
              <Notifikasi />
              <ConfirmationBox />
              
              {/* Help System Components */}
              <HelpModal />
              <GuidedTour />
              <HelpSidebar />
            </HelpProvider>
          </ClientSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}