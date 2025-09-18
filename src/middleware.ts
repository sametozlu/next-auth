import { auth } from "@/auth";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS: RegExp[] = [
  /^\/$/,
  /^\/login$/,
  /^\/api\/auth\//,
  /^\/public\//,
  /^\/favicon\.ico$/,
  /^\/_next\//,
];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((re) => re.test(pathname));
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const session = await auth();

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const roles: string[] = ((session as any).user?.roles as string[]) || [];

  // RBAC example: protect /admin with admin role
  if (pathname.startsWith("/admin") && !roles.includes("admin")) {
    return NextResponse.redirect(new URL("/403", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/(.*)"],
};


