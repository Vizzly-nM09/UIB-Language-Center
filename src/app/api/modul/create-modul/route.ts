import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const body = await req.json();

  try {
    const res = await axios.put(
      `${process.env.SERVICE_URL}/v2/modul/language-center`,
      body,
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
        { message: res.data.error || "Gagal membuat modul" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ data: error.response.data }, { status: 500 });
  }
}
