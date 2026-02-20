"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

// --- KOMPONEN INPUT MODERN ---
const FloatingInput = ({
  label,
  register,
  name,
  type = "text",
  errors,
  required = false,
  jenisTes,
  ...rest
}: any) => (
  <div className="relative group">
    <input
      type={type}
      id={name}
      {...register(name, {
        required: required ? "Wajib diisi" : false,
        min:
          name.startsWith("nilai") && jenisTes === "toefl_itp"
            ? { value: 31, message: "Min 31" }
            : undefined,
        ...rest,
      })}
      // ✅ MEKANISME HARD-BLOCK (DIPERTAHANKAN)
      onInput={(e) => {
        let val = e.currentTarget.value;
        if (name === "npm") {
          val = val.replace(/[^0-9]/g, "");
          if (val.length > 7) val = val.slice(0, 7);
          e.currentTarget.value = val;
        }
        if (type === "number" && name.startsWith("nilai")) {
          val = val.replace(/[^0-9]/g, "");
          let numVal = parseInt(val);
          let maxLimit = 999;

          if (jenisTes === "toeic") {
            maxLimit = 495;
          } else if (jenisTes === "toefl_itp") {
            maxLimit = name === "nilaiReading" ? 67 : 68;
          } else if (jenisTes === "toefl_ibt") {
            maxLimit = 30;
          }

          if (numVal > maxLimit) e.currentTarget.value = maxLimit.toString();
          else e.currentTarget.value = val;
        }
      }}
      className={`peer block w-full appearance-none rounded-2xl border-2 px-4 pt-5 pb-2 text-sm font-bold transition-all duration-300 focus:outline-none focus:ring-4
                ${errors[name] ? "border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50" : "border-gray-100 text-gray-900 focus:border-[#6C5DD3] focus:ring-[#6C5DD3]/20 bg-white/50 focus:bg-white"} 
                placeholder-transparent shadow-sm focus:shadow-md`}
      placeholder=" "
    />
    <label
      htmlFor={name}
      className={`absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-xs font-bold duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:font-medium peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:font-bold ${errors[name] ? "text-red-500" : "text-gray-400 peer-focus:text-[#6C5DD3]"}`}
    >
      {label}
    </label>
    {errors[name] && (
      <p className="mt-2 text-[11px] font-bold text-red-500">
        {errors[name]?.message}
      </p>
    )}
  </div>
);

const CustomSelect = ({
  label,
  register,
  name,
  required = false,
  children,
  isLoading,
  ...rest
}: any) => (
  <div className="relative group">
    <label className="block text-xs font-extrabold mb-2 ml-1 text-gray-400 uppercase tracking-widest">
      {label}
    </label>
    <div className="relative">
      <select
        {...register(name, { required })}
        {...rest}
        className="w-full px-4 py-3.5 border-2 rounded-2xl bg-white/50 border-gray-100 focus:border-[#6C5DD3] focus:ring-4 focus:ring-[#6C5DD3]/20 outline-none text-sm font-bold cursor-pointer appearance-none transition-all duration-300 shadow-sm focus:shadow-md focus:bg-white"
      >
        {children}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-[#6C5DD3] transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  </div>
);

export default function ScoreTest() {
  const router = useRouter();
  const { data: session } = useSession();
  const [prodiList, setProdiList] = useState<any[]>([]);
  const [isLoadingProdi, setIsLoadingProdi] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<any>({
    defaultValues: { jenisTes: "toeic", tipeTes: "prediction" },
  });

  const jenisTes = watch("jenisTes");
  const nL = watch("nilaiListening");
  const nS = watch("nilaiStructure");
  const nR = watch("nilaiReading");
  const nW = watch("nilaiWriting");
  const nSp = watch("nilaiSpeaking");

  // ✅ ESTIMASI SKOR TOTAL UNTUK SEMUA TES
  const estimatedTotal = useMemo(() => {
    const l = parseInt(nL) || 0;
    const s = parseInt(nS) || 0;
    const r = parseInt(nR) || 0;
    const w = parseInt(nW) || 0;
    const sp = parseInt(nSp) || 0;

    if (jenisTes === "toeic") return l + r;
    if (jenisTes === "toefl_itp") {
      if (l < 31 || s < 31 || r < 31) return 0;
      return Math.round(((l + s + r) / 3) * 10);
    }
    if (jenisTes === "toefl_ibt") return l + r + w + sp;
    return 0;
  }, [nL, nS, nR, nW, nSp, jenisTes]);

  // ✅ AMBIL DATA PRODI
  useEffect(() => {
    const fetchProdi = async () => {
      if (!session?.user?.accessToken) return;
      setIsLoadingProdi(true);
      try {
        // Get fresh session to ensure token is not expired
        const sessionRes = await fetch("/api/auth/session");
        const freshSession = await sessionRes.json();
        const freshToken =
          freshSession?.user?.accessToken || session?.user?.accessToken;

        console.log("Score-test: Using fresh token for prodi fetch");

        const res = await fetch(`/api/references/prodi-list`, {
          headers: { Authorization: `Bearer ${freshToken}` },
        });
        if (res.ok) {
          const data = await res.json();
          console.log("Score-test prodi response:", data);

          // Handle the proxy response structure: { data: {...} }
          const prodiData = data.data || data.prodiNama || {};
          console.log("Prodi data extracted:", prodiData);

          const prodiArray = Object.values(prodiData).sort((a: any, b: any) =>
            (a.ProdiNama || a.prodi_nama || "").localeCompare(
              b.ProdiNama || b.prodi_nama || "",
            ),
          );
          console.log("Prodi array:", prodiArray);
          setProdiList(prodiArray);
        } else {
          console.error("Failed to fetch prodi:", res.status, res.statusText);
        }
      } catch (error) {
        console.error("Error fetching prodi:", error);
      } finally {
        setIsLoadingProdi(false);
      }
    };
    fetchProdi();
  }, [session]);

  const onSubmit = async (data: any) => {
    if (!session?.user?.accessToken) return;
    try {
      const res = await fetch(`${process.env.SERVICE_URL}/v2/english-score`, {
        method: "PUT", // ✅ MENGGUNAKAN PUT
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          npm_mahasiswa: data.npm,
          nama_mahasiswa: data.nama,
          prodi: data.prodi,
          jenis_test: data.jenisTes,
          tipe_test: data.tipeTes,
          tanggal_ujian: data.tanggalUjian,
          nilai_listening: Number(data.nilaiListening || 0),
          nilai_structure: Number(data.nilaiStructure || 0),
          nilai_reading: Number(data.nilaiReading || 0),
          nilai_writing: Number(data.nilaiWriting || 0),
          nilai_speaking: Number(data.nilaiSpeaking || 0),
          skor_total: estimatedTotal, // ✅ SKOR TOTAL DIKIRIM
        }),
      });

      if (res.ok) {
        toast.success("Data berhasil disimpan!", {
          style: { borderRadius: "16px" },
        });
        router.push("/dashboard");
      } else {
        const err = await res.json();
        toast.error(err.message || "Gagal menyimpan data.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan koneksi.");
    }
  };

  return (
    <div className="space-y-8 text-gray-800">
      <Toaster position="top-center" />

      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black tracking-tighter text-gray-900">
          Input Score Test
        </h1>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest opacity-60">
          Portal Manajemen Sertifikasi
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* IDENTITAS */}
          <div className="space-y-6">
            <h3 className="text-xs font-black text-[#6C5DD3] uppercase tracking-[0.2em] flex items-center gap-4 before:h-[2px] before:w-8 before:bg-[#6C5DD3] after:h-[2px] after:flex-1 after:bg-gray-100">
              Identitas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FloatingInput
                label="NPM Mahasiswa"
                name="npm"
                register={register}
                errors={errors}
                required
              />
              <FloatingInput
                label="Nama Lengkap"
                name="nama"
                register={register}
                errors={errors}
                required
              />
              <CustomSelect
                label="Prodi"
                name="prodi"
                register={register}
                required
                disabled={isLoadingProdi}
              >
                <option value="">
                  {isLoadingProdi ? "Memuat..." : "Pilih Program Studi"}
                </option>
                {prodiList.map((item: any) => (
                  <option key={item.ProdiId} value={item.ProdiNama}>
                    {item.ProdiNama}
                  </option>
                ))}
              </CustomSelect>
            </div>
          </div>

          {/* DETAIL UJIAN */}
          <div className="space-y-6">
            <h3 className="text-xs font-black text-[#6C5DD3] uppercase tracking-[0.2em] flex items-center gap-4 before:h-[2px] before:w-8 before:bg-[#6C5DD3] after:h-[2px] after:flex-1 after:bg-gray-100">
              Ujian
            </h3>
            <div className="p-8 rounded-[2rem] bg-[#F8F9FC] grid grid-cols-1 md:grid-cols-3 gap-8 border border-gray-100/50">
              <CustomSelect
                label="Jenis"
                name="jenisTes"
                register={register}
                required
              >
                <option value="toeic">TOEIC</option>
                <option value="toefl_itp">TOEFL ITP</option>
                <option value="toefl_ibt">TOEFL iBT</option>
              </CustomSelect>
              <CustomSelect
                label="Tipe"
                name="tipeTes"
                register={register}
                required
              >
                <option value="prediction">Prediction</option>
                <option value="official">Official</option>
              </CustomSelect>
              <FloatingInput
                label="Tanggal Ujian"
                name="tanggalUjian"
                type="date"
                register={register}
                errors={errors}
                required
              />
            </div>
          </div>

          {/* NILAI DYNAMIC */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-4 flex-1 after:h-[2px] after:flex-1 after:bg-gray-100">
                Nilai ({jenisTes?.toUpperCase()})
              </h3>
              {estimatedTotal > 0 && (
                <div className="ml-4 px-6 py-2 bg-purple-600 text-white rounded-2xl text-[10px] font-black shadow-lg shadow-purple-200 animate-in zoom-in duration-300">
                  ESTIMASI TOTAL: {estimatedTotal}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              {jenisTes === "toeic" && (
                <>
                  <FloatingInput
                    label="Listening (495)"
                    name="nilaiListening"
                    type="number"
                    register={register}
                    errors={errors}
                    jenisTes={jenisTes}
                    required
                  />
                  <FloatingInput
                    label="Reading (495)"
                    name="nilaiReading"
                    type="number"
                    register={register}
                    errors={errors}
                    jenisTes={jenisTes}
                    required
                  />
                </>
              )}
              {jenisTes === "toefl_itp" && (
                <>
                  <FloatingInput
                    label="Listening (31-68)"
                    name="nilaiListening"
                    type="number"
                    register={register}
                    errors={errors}
                    jenisTes={jenisTes}
                    required
                  />
                  <FloatingInput
                    label="Structure (31-68)"
                    name="nilaiStructure"
                    type="number"
                    register={register}
                    errors={errors}
                    jenisTes={jenisTes}
                    required
                  />
                  <FloatingInput
                    label="Reading (31-67)"
                    name="nilaiReading"
                    type="number"
                    register={register}
                    errors={errors}
                    jenisTes={jenisTes}
                    required
                  />
                </>
              )}
              {jenisTes === "toefl_ibt" && (
                <>
                  <FloatingInput
                    label="Listening (0-30)"
                    name="nilaiListening"
                    type="number"
                    register={register}
                    errors={errors}
                    jenisTes={jenisTes}
                    required
                  />
                  <FloatingInput
                    label="Reading (0-30)"
                    name="nilaiReading"
                    type="number"
                    register={register}
                    errors={errors}
                    jenisTes={jenisTes}
                    required
                  />
                  <FloatingInput
                    label="Writing (0-30)"
                    name="nilaiWriting"
                    type="number"
                    register={register}
                    errors={errors}
                    jenisTes={jenisTes}
                    required
                  />
                  <FloatingInput
                    label="Speaking (0-30)"
                    name="nilaiSpeaking"
                    type="number"
                    register={register}
                    errors={errors}
                    jenisTes={jenisTes}
                    required
                  />
                </>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => reset()}
              className="px-8 py-4 font-bold text-xs text-gray-400 hover:text-gray-800 uppercase tracking-widest transition-all"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-12 py-4 bg-[#6C5DD3] text-white font-black text-xs rounded-2xl shadow-xl hover:scale-[1.02] transition-all uppercase tracking-widest"
            >
              {isSubmitting ? "Processing..." : "Submit Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
