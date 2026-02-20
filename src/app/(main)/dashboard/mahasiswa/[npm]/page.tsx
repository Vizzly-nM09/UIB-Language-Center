'use client';

import React, { useMemo, use } from 'react'; 
import { useRouter } from 'next/navigation';
import { 
  Calendar, User, GraduationCap, ArrowLeft, 
  TrendingUp, CheckCircle2, XCircle, Ear, BookOpen, Zap, FileText 
} from "lucide-react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table/Table"; 
import { useSession } from 'next-auth/react';
import { useDashboardStats } from '@/hooks/prodi/useDashboardStat';
import { checkPassStatus } from '../../view/DashboardPage'; // Import aturan lulus

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function StudentDetailPage({ params }: { params: Promise<{ npm: string }> }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { npm } = use(params);

  // Parsing NPM untuk parameter API (Angkatan & Prodi)
  const filters = useMemo(() => ({ 
    tahun: npm?.substring(0, 2) || '', 
    prodi: npm?.substring(2, 4) || '' 
  }), [npm]);

  const { data: apiResponse, isLoading } = useDashboardStats(session?.user?.accessToken, status, filters);
  
  const studentData = apiResponse?.hasilUjian || [];
  const history = useMemo(() => studentData.filter((m: any) => m.npm_mahasiswa === npm), [studentData, npm]);
  
  if (isLoading) return <div className="p-20 text-center animate-pulse font-black text-gray-400 uppercase tracking-widest">Sinkronisasi Data Mahasiswa...</div>;
  if (!history.length) return <div className="p-20 text-center bg-white m-10 rounded-3xl border border-dashed text-red-400 font-bold uppercase tracking-widest">Data NPM #{npm} Tidak Ditemukan</div>;

  const latest = history[0];
  const isPassed = checkPassStatus(latest.jenis_test, latest.tipe_test, latest.TotalScore);

  // Konfigurasi Grafik
  const chartData = {
    labels: history.map((h:any) => h.tanggal_ujian).reverse(),
    datasets: [{
      label: 'Skor Perkembangan',
      data: history.map((h:any) => h.TotalScore).reverse(),
      borderColor: '#6C5DD3', 
      backgroundColor: 'rgba(108, 93, 211, 0.08)',
      tension: 0.4,
      fill: true,
      pointRadius: 6,
      pointBackgroundColor: '#fff',
      pointBorderWidth: 3
    }],
  };

  return (
    <div className="min-h-screen w-full p-6 font-sans bg-[#F8F9FC] text-gray-900 pb-20">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* TOP BAR */}
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <button onClick={() => router.back()} className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-50 text-gray-500 font-black text-[12px] uppercase tracking-widest transition-all">
                <ArrowLeft size={16} /> Kembali
            </button>
            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-2 ${isPassed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {isPassed ? <CheckCircle2 size={12}/> : <XCircle size={12}/>}
                Status: {isPassed ? 'LULUS' : 'BELUM LULUS'}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* PROFILE HERO CARD */}
            <div className="lg:col-span-2 bg-[#6C5DD3] rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-xl shadow-purple-100">
                <div className="relative z-10">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                        <User size={28} />
                    </div>
                    <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">{latest.nama_mahasiswa}</h1>
                    <p className="text-white/70 font-bold tracking-[0.2em] text-[10px] uppercase">Nomor Pokok Mahasiswa / {latest.npm_mahasiswa}</p>
                    
                    <div className="mt-10 flex flex-wrap gap-10 border-t border-white/10 pt-8">
                        {[
                            { label: 'Ujian Terakhir', value: latest.jenis_test },
                            { label: 'Tipe Tes', value: latest.tipe_test },
                            { label: 'Tanggal', value: latest.tanggal_ujian }
                        ].map((info, i) => (
                            <div key={i}>
                                <p className="text-white/50 text-[9px] font-black uppercase mb-1">{info.label}</p>
                                <p className="text-lg font-bold">{info.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* SCORE CARD */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Total Score Akhir</p>
                <div className="text-8xl font-black text-gray-800 tracking-tighter tabular-nums">{latest.TotalScore}</div>
                <div className="h-1.5 w-16 bg-[#6C5DD3] rounded-full my-6"></div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest px-10 leading-relaxed italic">
                    {latest.keterangan_test}
                </p>
            </div>
        </div>

        {/* BREAKDOWN SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { label: 'Listening Section', value: latest.nilai_listening, icon: Ear, color: 'text-blue-500', bg: 'bg-blue-50' },
                { label: 'Structure Section', value: latest.nilai_structure, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
                { label: 'Reading Section', value: latest.nilai_reading, icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-[#6C5DD3] transition-all duration-300">
                    <div className={`p-4 rounded-2xl ${item.bg} ${item.color} shadow-sm group-hover:scale-110 transition-transform`}>
                        <item.icon size={22} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
                        <p className="text-2xl font-black text-gray-800 tracking-tighter mt-1">{item.value || 0}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* GRAPH & HISTORY TABLE */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-8 text-[#6C5DD3] font-black text-xs uppercase tracking-widest">
                    <TrendingUp size={16} /> Grafik Perkembangan Skor
                </div>
                <div className="h-64 w-full">
                    <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-50 font-black text-xs uppercase tracking-widest text-gray-800 flex items-center gap-2">
                    <FileText size={16} /> Riwayat Lengkap Ujian
                </div>
                <div className="overflow-y-auto h-[320px] custom-scrollbar">
                    <Table>
                        <TableBody>
                            {history.map((h: any) => (
                                <TableRow key={h.IdTest} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
                                    <TableCell className="px-8 py-5 text-xs font-bold text-gray-500 tracking-tighter">{h.tanggal_ujian}</TableCell>
                                    <TableCell className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-gray-800 uppercase">{h.jenis_test}</span>
                                            <span className="text-[9px] font-bold text-gray-400 uppercase">{h.tipe_test}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-8 py-5 text-right">
                                        <span className="px-4 py-1.5 bg-purple-50 text-[#6C5DD3] rounded-xl text-xs font-black shadow-sm border border-purple-100">
                                            {h.TotalScore}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}