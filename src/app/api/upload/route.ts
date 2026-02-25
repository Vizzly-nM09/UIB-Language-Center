// src/app/api/v1/upload/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get("authorization");
        const { searchParams } = new URL(req.url);
        const uploadType = searchParams.get("type");

        // 1. Ambil file DAN sheet_name dari frontend
        const incomingFormData = await req.formData();
        const file = incomingFormData.get("file") as File;

        // Ambil sheet_name dari frontend, kalau tidak ada kita paksa default "Sheet1"
        const sheetName = incomingFormData.get("sheet_name") || "Sheet1";

        if (!file) {
            return NextResponse.json({ message: "File tidak ditemukan" }, { status: 400 });
        }

        // 2. Siapkan FormData baru untuk dikirim ke Backend Server
        const backendFormData = new FormData();
        backendFormData.append("file", file);

        // 🔥 PASTIKAN INI ADA: Kirim sheet_name ke backend
        backendFormData.append("sheetName", sheetName as string);

        let apiUrl = "";
        switch (uploadType) {
            case "pegawai":
                apiUrl = `${process.env.SERVICE_URL}/v2/english-score/process-excel`;
                break;
            case "mandarin":
                apiUrl = `${process.env.SERVICE_URL}/v2/english-score/process-excel`;
                break;
            case "test":
                apiUrl = `${process.env.SERVICE_URL}/v2/english-score/process-excel`;
                break;
            default:
                return NextResponse.json({ message: "Tipe upload tidak valid" }, { status: 400 });
        }

        // 3. Hit Backend
        const response = await axios.post(apiUrl, backendFormData, {
            headers: {
                Authorization: authHeader || "",
                // Tidak perlu hardcode "Content-Type", Axios akan otomatis membuatnya 
                // bersama boundary yang tepat untuk FormData.
            },
        });

        // 4. 🔥 TANGKAL "FAKE 200" DARI BACKEND 🔥
        // Jika backend ngasih HTTP 200, tapi isi datanya bilang status 400 atau ada error
        if (response.data?.status && response.data.status >= 400) {
            return NextResponse.json({
                message: response.data.error || response.data.message || "Gagal diproses oleh backend",
                data: response.data
            }, { status: response.data.status }); // Lempar sebagai error sungguhan!
        }

        // 5. Jika benar-benar sukses
        return NextResponse.json({
            message: `Upload ${uploadType} berhasil diproses!`,
            data: response.data
        }, { status: 200 });

    } catch (error: any) {
        console.error("Upload Error:", error.response?.data || error.message);

        // Menangkap error jika HTTP status benar-benar 400/500 dari jaringan
        return NextResponse.json(
            {
                message: error.response?.data?.error || error.response?.data?.message || "Gagal menghubungi backend",
                error: error.message
            },
            { status: error.response?.status || 500 }
        );
    }
}