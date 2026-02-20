import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const pathname = request.nextUrl.pathname;
  const pathSegments = pathname.split("/");
  const usergroupId = pathSegments[pathSegments.length - 1];

  try {
    const res = await axios.get(
      `${process.env.SERVICE_URL}/v2/user-group/language-center/get-modul-group/${usergroupId}`,
      {
        headers: {
          Authorization: `${authHeader}`,
        },
      }
    );

    if (res.data.status === 200) {
      return NextResponse.json(
        {
          message: "Success",
          data: res.data,
        },
        { status: 200 }
      );
    } else if (res.data.status === 401) {
      return NextResponse.json(
        {
          message: res.data.message,
        },
        { status: 401 }
      );
    } else {
      return NextResponse.json(
        {
          message: res.data.error || "Gagal mengambil data modul",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { data: error.response.data.error },
      { status: 500 }
    );
  }
}
