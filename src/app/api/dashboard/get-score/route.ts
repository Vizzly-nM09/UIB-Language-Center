// app/api/dashboard/get-score/route.ts
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

/**
 * API Route Handler untuk endpoint /api/dashboard/get-score
 * 
 * Endpoint ini mengambil data skor ujian mahasiswa berdasarkan
 * filter prodi dan angkatan
 */
export async function GET(req: NextRequest) {
  // Extract query parameters dari URL
  const { searchParams } = new URL(req.url);
  const selProdi = searchParams.get("selProdi");
  const selAngkatan = searchParams.get("selAngkatan");
  const authHeader = req.headers.get("authorization");

  console.log("🌐 [API /get-score] Request received");
  console.log("🌐 [API /get-score] Filters - Prodi:", selProdi, "Angkatan:", selAngkatan);
  console.log("🌐 [API /get-score] Auth header present:", !!authHeader);

  try {
    // Request ke backend service dengan query parameters
    const res = await axios.get(
      `${process.env.SERVICE_URL}/v2/english-score`, 
      {
        params: { selProdi, selAngkatan },
        headers: { Authorization: authHeader },
        timeout: 15000, // 15 detik timeout (lebih lama karena query bisa kompleks)
      }
    );

    console.log("🌐 [API /get-score] Backend response status:", res.data.status);
    console.log("🌐 [API /get-score] Response data keys:", Object.keys(res.data));

    if (res.data.status === 200) {
      /**
       * Backend mengirim response dengan struktur:
       * {
       *   status: 200,
       *   hasilUjian: [...],
       *   selectProdi: {...}
       * }
       * 
       * Kita forward semua data ke frontend
       */
      console.log("✅ [API /get-score] Jumlah hasil ujian:", res.data.hasilUjian?.length || 0);
      
      return NextResponse.json(
        { data: res.data }, 
        { status: 200 }
      );
    }
    
    console.warn("⚠️ [API /get-score] Backend returned non-200 status:", res.data.status);
    return NextResponse.json(
      { message: "Gagal mengambil data skor", details: res.data }, 
      { status: 500 }
    );
    
  } catch (error: any) {
    console.error("❌ [API /get-score] Error occurred:", error.message);
    
    if (error.response) {
      console.error("❌ [API /get-score] Backend error:", error.response.status, error.response.data);
      
      return NextResponse.json(
        { 
          error: "Backend error", 
          details: error.response.data 
        }, 
        { status: error.response.status }
      );
      
    } else if (error.request) {
      console.error("❌ [API /get-score] No response from backend");
      
      return NextResponse.json(
        { error: "Tidak dapat terhubung ke backend service" }, 
        { status: 503 }
      );
      
    } else {
      console.error("❌ [API /get-score] Error:", error.message);
      
      return NextResponse.json(
        { error: "Internal server error", message: error.message }, 
        { status: 500 }
      );
    }
  }
}