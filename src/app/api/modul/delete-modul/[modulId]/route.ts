import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  // ✅ FIX 1: Tipe params WAJIB dibungkus dengan Promise
  context: { params: Promise<{ modulId: string }> }
) {
  const auth = req.headers.get("authorization");

  // ✅ FIX 2: Kita harus me-ngunggu (await) params-nya. 
  // Sekarang Anda tidak perlu repot-repot membelah (split) URL lagi!
  const { modulId } = await context.params;

  try {
    const res = await axios.delete(
      `${process.env.SERVICE_URL}/v2/modul/language-center/${modulId}`,
      {
        headers: {
          Authorization: `${auth}`,
        },
      }
    );

    if (res.data.status === 200) {
      return NextResponse.json(
        { message: "Success", data: res.data },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: res.data.error || "Gagal menghapus modul" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { data: error?.response?.data || "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}