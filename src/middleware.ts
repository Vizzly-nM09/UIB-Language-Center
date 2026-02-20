import withAuth from "@/middlewares/withAuth";
import { NextResponse, type NextRequest } from "next/server";

export function mainMiddleware(request: NextRequest) {
  return NextResponse.next();
}

export default withAuth(mainMiddleware);

export const config = {
  matcher: [
    "/",
    "/login",
    "/dashboard/:path*",
    "/management-data/:path*",
    "/score-test/:path*",
    "/upload-center/:path*",
    // buat nambah sesuatu disini
  ],
};
