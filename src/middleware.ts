import { auth } from "@/auth";
import { NextResponse, type NextRequest } from "next/server";
import type { Session } from "next-auth";
import { locales } from "@/i18n/locales";

const PUBLIC_PATHS: RegExp[] = [
	/^\/$/,
	/^\/login$/,
	/^\/api\/auth\//,
	/^\/public\//,
	/^\/favicon\.ico$/,
	/^\/_next\//,
];

function isPublicPath(pathname: string): boolean {
	if (PUBLIC_PATHS.some((re) => re.test(pathname))) return true;
    // locale-rooted pages are public for this e-commerce section
    const seg = pathname.split("/").filter(Boolean)[0];
    if (seg && (locales as readonly string[]).includes(seg)) return true;
	return false;
}

export default async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	if (isPublicPath(pathname)) {
		return NextResponse.next();
	}

	const session = (await auth()) as (Session & { user?: Session["user"] & { roles?: string[] } }) | null;

	if (!session) {
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
		return NextResponse.redirect(loginUrl);
	}

	const roles: string[] = session?.user?.roles ?? [];

	if (pathname.startsWith("/admin") && !roles.includes("admin")) {
		return NextResponse.redirect(new URL("/403", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/(.*)"],
};


