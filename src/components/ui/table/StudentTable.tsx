'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link'; 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./Table"; 
import { Icons } from '@/components/ui/icons';

export const StudentsTable = ({ data = [] }: { data: any[] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = useMemo(() => {
        const lowerSearch = searchTerm.toLowerCase().trim();
        if (!lowerSearch) return data;
        return data.filter((mhs) => {
            const searchableFields = [
                mhs.npm_mahasiswa,
                mhs.nama_mahasiswa,
                mhs.jenis_test,
                mhs.tipe_test,
                (mhs.TotalScore || 0).toString()
            ].map(f => String(f ?? "").toLowerCase());
            return searchableFields.some(field => field.includes(lowerSearch));
        });
    }, [data, searchTerm]);

    const totalPages = Math.ceil(filteredData.length / entriesPerPage) || 1;
    const currentEntries = filteredData.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

    return (
        <div className="rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden flex flex-col w-full">
            <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-sm font-bold text-gray-800 tracking-tight">Daftar Mahasiswa</h2>
                    <select value={entriesPerPage} onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }} className="bg-gray-50 px-3 py-1 rounded-lg text-xs font-bold text-[#9969ff] outline-none border border-gray-100">
                        <option value={10}>10</option><option value={25}>25</option><option value={50}>50</option>
                    </select>
                </div>
                <div className="relative w-full md:w-80">
                    {/* FIX TYPE ERROR: Ikon dibungkus div */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Icons.Search />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Cari NPM, Nama, atau Skor..." 
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="w-full p-2.5 pl-11 text-xs rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-[#9969ff]/20 outline-none transition-all font-medium"
                    />
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-gray-50/50">
                        <TableRow className="border-none">
                            <TableHead className="w-16"></TableHead> 
                            {['NPM', 'Nama', 'Jenis', 'Tipe', 'Score', 'Tanggal'].map((h) => (
                                <TableHead key={h} className="h-12 px-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">{h}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentEntries.map((mhs, idx) => (
                            <TableRow key={idx} className="border-b border-gray-50 hover:bg-gray-50/30 transition-all group">
                                <TableCell className="px-4 py-4 text-center">
                                    <Link href={`/dashboard/mahasiswa/${mhs.npm_mahasiswa}`}>
                                        {/* ICON MATA UNGU: Latar ungu cerah, Ikon ungu, Hover ungu pekat */}
                                        <div className="inline-flex items-center justify-center p-2 rounded-xl border border-purple-100 bg-purple-50 text-[#9969ff] hover:bg-[#9969ff] hover:text-white transition-all duration-300 active:scale-90 shadow-sm">
                                            <Icons.Eye />
                                        </div>
                                    </Link>
                                </TableCell>
                                <TableCell className="px-6 py-4 text-xs font-medium text-gray-500">{mhs.npm_mahasiswa}</TableCell>
                                <TableCell className="px-6 py-4 text-xs font-bold text-gray-800">{mhs.nama_mahasiswa}</TableCell>
                                <TableCell className="px-6 py-4 text-[9px] font-black text-[#9969ff] uppercase">{mhs.jenis_test}</TableCell>
                                <TableCell className="px-6 py-4 text-xs font-medium text-gray-400">{mhs.tipe_test}</TableCell>
                                <TableCell className="px-6 py-4 text-xs font-black text-gray-800">{mhs.TotalScore || 0}</TableCell>
                                <TableCell className="px-6 py-4 text-[10px] text-gray-400 font-medium">{mhs.tanggal_ujian}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="p-6 bg-gray-50/50 border-t border-gray-50 flex justify-between items-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total: {filteredData.length} entries</span>
                <div className="flex gap-1 items-center">
                    <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="px-3 py-2 text-[10px] font-black uppercase text-gray-400 hover:text-[#9969ff] disabled:opacity-30">Prev</button>
                    <span className="w-8 h-8 flex items-center justify-center bg-[#9969ff] text-white rounded-lg text-xs font-black">{currentPage}</span>
                    <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="px-3 py-2 text-[10px] font-black uppercase text-gray-400 hover:text-[#9969ff] disabled:opacity-30">Next</button>
                </div>
            </div>
        </div>
    );
};