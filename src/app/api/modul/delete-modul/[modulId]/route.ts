import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { modulId: string } }
) {
  const auth = req.headers.get("authorization");
  // const { modulId } = params;
  const pathname = req.nextUrl.pathname;
  const pathSegment = pathname.split("/");
  const modulId = pathSegment[pathSegment.length - 1];

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
    return NextResponse.json({ data: error.response.data }, { status: 500 });
  }
}
