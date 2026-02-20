import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const body = await req.json();

  try {
    const res = await axios.patch(
      `${process.env.SERVICE_URL}/v2/user/language-center`,
      body,
      {
        headers: {
          Authorization: `${auth}`,
        },
      }
    );

    console.log("edit user response data:", res.data);

    if (res.data.status === 200) {
      return NextResponse.json(
        {
          message: "Berhasil mengedit user",
          data: res.data.data,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Gagal mengedit user",
          error: res.data.error,
        },
        { status: res.data.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Gagal mengedit user",
        error: error,
      },
      { status: 500 }
    );
  }
}
