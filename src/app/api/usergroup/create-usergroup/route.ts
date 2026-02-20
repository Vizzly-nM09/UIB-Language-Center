import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const body = await req.json();

  try {
    const res = await axios.put(
      `${process.env.SERVICE_URL}/v2/user-group/language-center`,
      body,
      {
        headers: {
          Authorization: `${auth}`,
        },
      }
    );

    if (res.data.status === 200) {
      return NextResponse.json(
        {
          message: "Usergroup created successfully",
          data: res.data.data,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: res.data.error || "Gagal membuat usergroup" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error creating usergroup:", error);
    return NextResponse.json(
      { message: error.response?.data?.error || "Gagal membuat usergroup" },
      { status: 500 }
    );
  }
}
