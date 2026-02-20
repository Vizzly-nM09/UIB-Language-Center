import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const { pathname } = new URL(req.url);
  const pathSegments = pathname.split("/");
  const userId = pathSegments[pathSegments.length - 1];

  console.log("Deleting user with ID:", userId);

  try {
    const res = await axios.delete(
      `${process.env.SERVICE_URL}/v2/user/language-center/${userId}`,
      {
        headers: {
          Authorization: `${auth}`,
        },
      }
    );

    if (res.data.status === 200) {
      return NextResponse.json(
        {
          message: "Berhasil menghapus user",
          data: res.data.data,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Gagal menghapus user",
          error: res.data.error,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Gagal menghapus user" },
      { status: 500 }
    );
  }
}
