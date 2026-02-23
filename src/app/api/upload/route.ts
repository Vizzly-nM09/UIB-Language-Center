// src/app/api/v1/upload/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // 1. Ambil 'type' dari URL (?type=pegawai)
        const { searchParams } = new URL(req.url);
        const uploadType = searchParams.get("type");

        // 2. Ambil filenya
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ message: "File tidak ditemukan" }, { status: 400 });
        }

        // 3. Logic Berdasarkan Type
        switch (uploadType) {
            case "pegawai":
                console.log("Memproses data Pegawai...");
                // Jalankan fungsi simpan data pegawai di sini
                break;

            case "mandarin":
                console.log("Memproses data Mandarin...");
                // Jalankan fungsi simpan data mandarin di sini
                break;

            case "test":
                console.log("Memproses data Test Inggris...");
                // Jalankan fungsi simpan data test di sini
                break;

            default:
                return NextResponse.json({ message: "Tipe upload tidak valid" }, { status: 400 });
        }

        return NextResponse.json({
            message: `Upload ${uploadType} berhasil diproses!`
        }, { status: 200 });

    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}