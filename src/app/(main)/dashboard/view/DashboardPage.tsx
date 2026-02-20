'use client';

import React, { useState, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useDashboardStats } from '@/hooks/prodi/useDashboardStat';
import { useProdiData } from '@/hooks/prodi/useProdiData';
import { Icons } from '@/components/ui/icons';
import { StudentsTable } from '@/components/ui/table/StudentTable';
import { StatCard } from './StatCard';
import { AnalyticsChart } from './AnalyticChart';
import { TrendingUp, Filter, Loader2, PieChart, ChevronLeft, ChevronRight } from "lucide-react";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * POIN 3: Aturan Skor Lulus Global
 */
export const checkPassStatus = (jenis: string, tipe: string, score: number) => {
  const j = jenis?.toUpperCase() || "";
  const t = tipe?.toLowerCase() || "";
  
  if (j.includes('TOEIC')) {
    if (t.includes('prediction')) return score >= 700;
    if (t.includes('official')) return score >= 605;
  }
  // TOEFL (ITP/iBT/Default) minimal 500
  return score >= 500;
};

export default function DashboardView() {
  const { data: session, status } = useSession();
  const currentYear = new Date().getFullYear();
  
  // POIN 2: Rentang Tahun sampai 2010
  const angkatanOptions = useMemo(() => {
    const years = [];
    for (let i = currentYear; i >= 2010; i--) years.push(i.toString());
    return years;
  }, [currentYear]);

  const [filterInputs, setFilterInputs] = useState({ prodi: '', tahun: '' });
  const [activeFilters, setActiveFilters] = useState({ prodi: '', tahun: '' });
  
  // State navigasi untuk 4 chart kelulusan
  const [chartIndex, setChartIndex] = useState(0); 

  const { data: prodiList } = useProdiData(session?.user?.accessToken, status);
  const { data: apiResponse, isLoading: isLoadingStats } = useDashboardStats(
    session?.user?.accessToken,
    status,
    activeFilters
  );

  const studentData = apiResponse?.hasilUjian || [];
  const isDataReady = activeFilters.tahun !== '';

  /**
   * PERBAIKAN: LOGIKA RATA-RATA SKOR BULANAN (FULL CODE)
   * Menghitung nilai rata-rata kumulatif agar data tidak tertimpa
   */
  const trendData = useMemo(() => {
    const monthlyStats = {
      TOEIC: Array.from({ length: 12 }, () => ({ total: 0, count: 0 })),
      TOEFL: Array.from({ length: 12 }, () => ({ total: 0, count: 0 }))
    };

    studentData.forEach((s: any) => {
      if (s.tanggal_ujian) {
        const monthIdx = parseInt(s.tanggal_ujian.split("-")[1]) - 1;
        if (monthIdx >= 0 && monthIdx < 12) {
          const jenis = s.jenis_test?.toUpperCase();
          if (jenis?.includes('TOEIC')) {
            monthlyStats.TOEIC[monthIdx].total += (s.TotalScore || 0);
            monthlyStats.TOEIC[monthIdx].count += 1;
          } else if (jenis?.includes('TOEFL')) {
            monthlyStats.TOEFL[monthIdx].total += (s.TotalScore || 0);
            monthlyStats.TOEFL[monthIdx].count += 1;
          }
        }
      }
    });

    return {
      labels: MONTHS,
      datasets: [
        { 
          label: 'TOEIC (Avg)', 
          data: monthlyStats.TOEIC.map(m => m.count > 0 ? Math.round(m.total / m.count) : 0), 
          backgroundColor: '#34d399', 
          borderRadius: 6 
        },
        { 
          label: 'TOEFL (Avg)', 
          data: monthlyStats.TOEFL.map(m => m.count > 0 ? Math.round(m.total / m.count) : 0), 
          backgroundColor: '#fb923c', 
          borderRadius: 6 
        },
      ]
    };
  }, [studentData]);

  /**
   * LOGIKA 4 KATEGORI KELULUSAN (Swipeable)
   */
  const passFailCategories = [
    { title: 'TOEIC Prediction', jenis: 'TOEIC', tipe: 'Prediction' },
    { title: 'TOEIC Official', jenis: 'TOEIC', tipe: 'Official' },
    { title: 'TOEFL Prediction', jenis: 'TOEFL', tipe: 'Prediction' },
    { title: 'TOEFL Official', jenis: 'TOEFL', tipe: 'Official' },
  ];

  /**
   * PERBAIKAN: LOGIKA PERSENTASE REMEDIAL (0% JIKA DATA KOSONG)
   */
  const currentCategoryStats = useMemo(() => {
    const cat = passFailCategories[chartIndex];
    const group = studentData.filter((s: any) => 
      s.jenis_test?.toUpperCase().includes(cat.jenis) && 
      s.tipe_test?.toLowerCase().includes(cat.tipe.toLowerCase())
    );
    
    const total = group.length;
    const passCount = group.filter((s: any) => checkPassStatus(s.jenis_test, s.tipe_test, s.TotalScore)).length;
    
    // Jika total mahasiswa adalah 0, maka persentase lulus dan remedial keduanya 0%
    const passRate = total > 0 ? Math.round((passCount / total) * 100) : 0;
    const failRate = total > 0 ? (100 - passRate) : 0; 

    return { 
      title: cat.title,
      passCount, 
      failCount: total - passCount, 
      passRate,
      failRate,
      total
    };
  }, [studentData, chartIndex]);

  // Statistik Kumulatif untuk Card Utama
  const mainStats = useMemo(() => {
    const calcAvg = (key: string) => {
      const group = studentData.filter((s: any) => s.jenis_test?.toUpperCase().includes(key));
      return group.length ? Math.round(group.reduce((a: any, b: any) => a + (b.TotalScore || 0), 0) / group.length) : 0;
    };
    return { 
      total: studentData.length, 
      toeicAvg: calcAvg('TOEIC'), 
      toeflAvg: calcAvg('TOEFL') 
    };
  }, [studentData]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      {/* FILTER BOX */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
         <div className="flex flex-col lg:flex-row gap-4 items-end border-t border-gray-50 pt-6">
            <div className="w-full lg:flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Program Studi</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-[#9969ff] transition-all" value={filterInputs.prodi} onChange={(e) => setFilterInputs({...filterInputs, prodi: e.target.value})}>
                     <option value="">Semua Program Studi</option>
                     {prodiList && Object.entries(prodiList).map(([id, info]: [string, any]) => <option key={id} value={id}>{info.ProdiNama}</option>)}
                  </select>
               </div>
               <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Angkatan</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-[#9969ff] transition-all" value={filterInputs.tahun} onChange={(e) => setFilterInputs({...filterInputs, tahun: e.target.value})}>
                     <option value="">Pilih Angkatan</option>
                     {angkatanOptions.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
               </div>
            </div>
            <button 
              onClick={() => setActiveFilters(filterInputs)} 
              className="px-10 py-2.5 bg-[#9969ff] text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg active:scale-90 hover:bg-[#8651ff] transition-all h-[44px] flex items-center justify-center gap-2"
              disabled={isLoadingStats || !filterInputs.tahun}
            >
              {isLoadingStats ? <Loader2 className="animate-spin w-4 h-4" /> : "Update Analitik"}
            </button>
         </div>
      </div>

      {!isDataReady ? (
        <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[2rem] border border-dashed border-gray-200 text-gray-400 font-bold text-sm">
           <Filter className="mb-4 text-gray-200 animate-bounce" size={48} />
           Silahkan pilih Angkatan untuk melihat data.
        </div>
      ) : (
        <>
          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard title="Total Mhs" value={mainStats.total} icon={Icons.Users} color="bg-blue-500" />
            <StatCard title="Avg TOEIC" value={mainStats.toeicAvg} icon={Icons.Score} color="bg-[#9969ff]" />
            <StatCard title="Avg TOEFL" value={mainStats.toeflAvg} icon={Icons.Test} color="bg-orange-500" />
            
            {/* Card Lulus & Remedial mengikuti kategori Swipe Chart */}
            <StatCard 
              title={`Lulus (${passFailCategories[chartIndex].title})`} 
              value={currentCategoryStats.passRate} 
              icon={Icons.Check} color="bg-teal-500" isPercent 
            />
            <StatCard 
              title={`Remedial (${passFailCategories[chartIndex].title})`} 
              value={currentCategoryStats.failRate} 
              icon={Icons.Alert} color="bg-red-500" isPercent 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* TREN CHART (AVERAGE) */}
              <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-8 text-[#9969ff] font-bold text-lg uppercase tracking-tight"><TrendingUp size={20} /> Tren Skor Bulanan (Rata-rata)</div>
                  <div className="w-full aspect-[21/9] min-h-[300px]"><AnalyticsChart data={trendData} /></div>
              </div>
              
              {/* RATIO KELULUSAN DENGAN SWIPE */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center">
                  <div className="flex justify-between items-center w-full mb-8">
                      <div className="flex items-center gap-2 text-gray-800 font-bold text-[10px] uppercase tracking-tight">
                        <PieChart size={18} className="text-[#9969ff]" /> {currentCategoryStats.title}
                      </div>
                      <div className="flex gap-1">
                          <button onClick={() => setChartIndex(prev => prev === 0 ? 3 : prev - 1)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-[#9969ff] hover:text-white transition-all"><ChevronLeft size={14} /></button>
                          <button onClick={() => setChartIndex(prev => prev === 3 ? 0 : prev + 1)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-[#9969ff] hover:text-white transition-all"><ChevronRight size={14} /></button>
                      </div>
                  </div>

                  <div className="relative w-full aspect-square max-w-[200px]">
                      {currentCategoryStats.total > 0 ? (
                        <>
                          <Doughnut 
                            data={{
                                labels: ['Lulus', 'Remedial'],
                                datasets: [{
                                    data: [currentCategoryStats.passCount, currentCategoryStats.failCount],
                                    backgroundColor: ['#10b981', '#ef4444'],
                                    borderWidth: 0,
                                }]
                            }} 
                            options={{ cutout: '75%', plugins: { legend: { display: false } } }} 
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-3xl font-black text-gray-800 leading-none">{currentCategoryStats.passRate}%</span>
                              <span className="text-[10px] font-bold text-gray-400 uppercase mt-1">Lulus</span>
                          </div>
                        </>
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-300 text-[10px] font-bold italic uppercase">Belum Ada Peserta</div>
                      )}
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                      <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                          <p className="text-[9px] font-black text-emerald-600 uppercase">Lulus</p>
                          <p className="text-xl font-black text-emerald-700">{currentCategoryStats.passCount}</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded-2xl border border-red-100 text-center">
                          <p className="text-[9px] font-black text-red-600 uppercase">Remedial</p>
                          <p className="text-xl font-black text-red-700">{currentCategoryStats.failCount}</p>
                      </div>
                  </div>
              </div>
          </div>

          <div className="w-full"><StudentsTable data={studentData} /></div>
        </>
      )}
    </div>
  );
}