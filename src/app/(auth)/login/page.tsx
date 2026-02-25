"use client";

import React, { useState, Suspense, useEffect } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useNotifikasi } from "@/store/useNotifikasi";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Award,
  BookOpen,
  Globe2,
  Loader2,
  AlertCircle,
} from "lucide-react";

function LoginContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { replace } = useRouter();
  const { show: showNotification } = useNotifikasi();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const pesan = searchParams.get("pesan");

  // ✅ TAMBAHAN: Hapus memori Dashboard setiap kali masuk halaman Login (otomatis reset saat logout)
  useEffect(() => {
    sessionStorage.removeItem("dashboardState");
  }, []);

  const examFeatures = [
    {
      title: "TOEIC®",
      desc: "Communication focus.",
      icon: <Award className="w-4 h-4" />,
    },
    {
      title: "TOEFL ITP®",
      desc: "Institutional Testing.",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      title: "TOEFL iBT®",
      desc: "Internet-based Test.",
      icon: <Globe2 className="w-4 h-4" />,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "" || password === "") {
      showNotification({
        status: "text-yellow-500",
        icon: "bx bx-error text-2xl",
        header: "Data tidak lengkap",
        message: "Email dan password harus diisi",
      });
      return;
    }

    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
        asal_sistem: "language_center",
      });

      if (!res?.error) {
        showNotification({
          status: "text-green-500",
          icon: "bx bx-check text-2xl",
          header: "Login berhasil",
          message: "Mengarahkan ke dashboard...",
        });

        setTimeout(() => {
          replace(callbackUrl || `/dashboard`);
        }, 1000);
      } else {
        setIsLoading(false);
        showNotification({
          status: "text-red-500",
          icon: "bx bx-error text-2xl",
          header: "Login gagal",
          message: res.error || "Email atau password salah",
        });
      }
    } catch (error) {
      setIsLoading(false);
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Terjadi kesalahan",
        message: "Silahkan coba lagi nanti",
      });
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F3F4F6] font-sans overflow-hidden">
      <section className="relative hidden w-[60%] flex-col p-10 lg:flex bg-gradient-to-br from-[#6C5DD3] to-[#5a4db8] overflow-hidden">
        <div className="absolute top-0 right-0 h-full w-24 translate-x-[1px] pointer-events-none z-20">
          <svg
            className="h-full w-full text-[#F3F4F6]"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0 0 C 50 20, 50 40, 20 50 C -10 60, -10 80, 20 100 L 100 100 L 100 0 Z" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col h-full text-white">
          <div className="mb-10 animate-in fade-in slide-in-from-left duration-700">
            <Image
              src="/logo/logo-uib-putih.png"
              alt="UIB Logo"
              width={220}
              height={60}
              className="object-contain"
              priority
            />
          </div>
          <div className="max-w-md">
            <h1 className="text-4xl xl:text-5xl font-black leading-tight tracking-tight mb-7">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-purple-200">
                UIB Language Center
              </span>
            </h1>
            <p className="text-sm xl:text-base text-white/80 font-medium leading-relaxed mb-10">
              Sistem informasi terintegrasi untuk pengelolaan sertifikasi bahasa
              Inggris sivitas akademika UIB.
            </p>
          </div>
          <div className="grid grid-cols-5 gap-5 mt-auto mb-6 pr-10">
            {examFeatures.map((item, index) => (
              <div
                key={index}
                className="space-y-2 group p-3 rounded-xl transition-all hover:bg-white/5"
              >
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shadow-inner">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-white/60 leading-tight">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-white/40 text-[9px] font-bold tracking-[0.5em] uppercase">
            2026 © Universitas Internasional Batam
          </div>
        </div>
      </section>

      <section className="flex flex-1 items-center justify-center p-6 bg-[#F3F4F6]">
        <div className="w-full max-w-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-white">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-500">
                  Welcome
                </span>
              </h2>
              <p className="text-gray-400 text-sm font-medium mt-2 text-center">
                Please sign in to continue
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {pesan && (
                <div className="flex items-start gap-3 rounded-2xl bg-red-50 p-4 border border-red-100 animate-in fade-in zoom-in duration-300">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-bold text-red-600 leading-relaxed">
                    {pesan}
                  </p>
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-gray-400 ml-1 uppercase tracking-widest">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300 group-focus-within:text-[#6C5DD3] transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 py-3.5 pl-11 pr-4 text-xs font-bold text-gray-700 outline-none transition-all focus:border-[#6C5DD3] focus:bg-white focus:ring-4 focus:ring-[#6C5DD3]/5"
                    placeholder="name@uib.ac.id"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-gray-400 ml-1 uppercase tracking-widest">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300 group-focus-within:text-[#6C5DD3] transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 py-3.5 pl-11 pr-11 text-xs font-bold text-gray-700 outline-none transition-all focus:border-[#6C5DD3] focus:bg-white focus:ring-4 focus:ring-[#6C5DD3]/5"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#6C5DD3] transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 w-full h-12 rounded-2xl bg-[#6C5DD3] text-[11px] font-black tracking-widest text-white shadow-xl shadow-purple-200/50 transition-all hover:bg-[#5b4eb8] hover:shadow-2xl active:scale-[0.97] disabled:opacity-70 flex items-center justify-center gap-2 uppercase"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  "Login to UCLC"
                )}
              </button>
            </form>
          </div>
          <p className="mt-8 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Language Center Authentication
          </p>
        </div>
      </section>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-[#F3F4F6]">
          <Loader2 className="w-8 h-8 animate-spin text-[#6C5DD3]" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
