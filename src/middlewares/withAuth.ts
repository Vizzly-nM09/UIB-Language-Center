import { getToken } from "next-auth/jwt";
import {
  NextRequest,
  NextResponse,
  NextProxy,
  NextFetchEvent,
} from "next/server";

const AUTH_PAGES = ["/login"];

export default function withAuth(middleware: NextProxy) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const { pathname } = req.nextUrl;

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const isAuthPage = AUTH_PAGES.some(
      (page) => pathname === `${page}` || pathname === `${page}/`
    );

    if (token && !token.error && isAuthPage) {
      const dashboardUrl = new URL(`/dashboard`, req.url);
      return NextResponse.redirect(dashboardUrl);
    }

    if ((!token || token.error === "RefreshAccessTokenError") && !isAuthPage) {
      const loginUrl = new URL(`/login`, req.url);
      loginUrl.searchParams.set("callbackUrl", req.url);
      return NextResponse.redirect(loginUrl);
    }

    return middleware(req, event);
  };
}
