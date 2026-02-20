import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    console.error("Prodi-list: Missing authorization header");
    return NextResponse.json(
      { error: "Missing authorization header" },
      { status: 401 }
    );
  }

  try {
    console.log("Prodi-list: Fetching from", process.env.SERVICE_URL);
    console.log("Prodi-list: Auth header:", authHeader.substring(0, 30) + "...");

    const res = await axios.get(
      `${process.env.SERVICE_URL}/v2/references/prodi-list`,
      {
        headers: { Authorization: authHeader },
      }
    );

    console.log("Backend response status:", res.data.status);
    console.log("Backend response structure keys:", Object.keys(res.data));

    // Backend returns { status: 200, prodiNama: {...} }
    if (res.data.status === 200 || res.status === 200) {
      const prodiData = res.data.prodiNama || res.data.data || {};

      console.log(
        "Prodi data keys:",
        Object.keys(prodiData).length > 0
          ? Object.keys(prodiData).slice(0, 3)
          : "empty"
      );

      return NextResponse.json(
        {
          data: prodiData,
        },
        { status: 200 }
      );
    }

    console.error("Unexpected response status:", res.data.status);
    return NextResponse.json(
      { message: "Gagal mengambil data", error: "Invalid status" },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("Prodi Proxy Error:", error.message);
    console.error("Error status:", error.response?.status);
    console.error("Error data:", error.response?.data);
    console.error("Auth header sample:", authHeader?.substring(0, 30) + "...");

    return NextResponse.json(
      {
        error: "Server Error",
        details: error.response?.data?.message || error.message,
        status: error.response?.status,
      },
      { status: error.response?.status || 500 }
    );
  }
}