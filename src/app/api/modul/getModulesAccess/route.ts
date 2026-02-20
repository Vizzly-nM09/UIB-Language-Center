import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const authHeader = req.headers.get("authorization");
  try {
    const res = await axios.post(
      `${process.env.SERVICE_URL}/v1/user/get-permission`,
      {
        ...body,
      },
      {
        headers: {
          Authorization: `${authHeader}`,
        },
      }
    );

    console.log("res getModulesAccess:", res.data);

    if (res.data.status === 200) {
      return NextResponse.json(
        { message: "Success", data: res.data.permissionList },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.log("error getModulesAccess:", error);
    return NextResponse.json(
      { error: error.response.error },
      { status: error.response?.status || 500 }
    );
  }
}
