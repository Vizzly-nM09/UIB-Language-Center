// app/api/modul/getModulByUsergroup/[usergroup]/route.ts

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  try {
    const res = await axios.get(
      `${process.env.SERVICE_URL}/v2/user-group/language-center`,
      {
        headers: {
          Authorization: `${authHeader}`,
        },
      }
    );

    console.log("response data:", res.data);

    if (res.data.status === 200) {
      return NextResponse.json(
        { message: "Success", data: res.data.groupData },
        { status: 200 }
      );
    } else if (res.data.status === 401) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    } else {
      return NextResponse.json(
        { message: res.data.error || "Gagal mengambil data grup" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ data: error.response.data }, { status: 500 });
  }
}
