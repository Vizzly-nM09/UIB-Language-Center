import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const body = await req.json();

  try {
    const res = await axios.patch(
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
          message: "Usergroup edited successfully",
          data: res.data.data,
        },
        { status: 200 }
      );
    } else {
      console.error("Error editing usergroup:", res.data);
      return NextResponse.json(
        { message: res.data.error || "Gagal mengedit usergroup" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error editing usergroup:", error);
    return NextResponse.json(
      { message: error.response?.data?.error || "Gagal mengedit usergroup" },
      { status: 500 }
    );
  }
}
