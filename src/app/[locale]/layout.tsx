import type { Metadata } from "next";
import "@/app/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n/locales";
import { AppProviders } from "@/app/providers";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: {
		default: "E-Commerce",
		template: "%s | E-Commerce",
	},
	description: "SEO friendly e-commerce demo",
};

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	const { locale } = params;
	if (!locales.includes(locale)) {
    notFound();
	}
  setRequestLocale(locale);
	const messages = await getMessages();
	return (
		<html lang={locale}>
			<body className="min-h-screen flex flex-col">
				<NextIntlClientProvider messages={messages} locale={locale} defaultTranslationValues={{}}>
					<AppProviders>
						<header className="border-b">
							<nav className="mx-auto max-w-7xl p-4 flex gap-4">
								<Link href={`/${locale}`}>Home</Link>
								<Link href={`/${locale}/products`}>Products</Link>
								<Link href={`/${locale}/cart`}>Cart</Link>
							</nav>
						</header>
						<div className="flex-1">{children}</div>
						<footer className="border-t p-4 text-center text-sm text-gray-500">E-Commerce Demo</footer>
					</AppProviders>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
