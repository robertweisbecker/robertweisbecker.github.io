import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Script from "next/script";
import "./globals.css";

const interVariable = localFont({
	src: [
		{ path: "./fonts/InterVariable.woff2", style: "normal" },
		{ path: "./fonts/InterVariable-Italic.woff2", style: "italic" },
	],
	variable: "--font-sans",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://bob.fyi"),
	title: "bob dot fyi",
	description: "Bob Weisbecker is a systems & product designer at EVERFI",
	openGraph: {
		title: "Robert (Bob) Weisbecker",
		description: "Bob Weisbecker is a systems & product designer at EVERFI",
		url: "https://bob.fyi",
		siteName: "bob.fyi",
		locale: "en_US",
		type: "website",
		images: [{ url: "/assets/share.png", alt: "Bob Weisbecker | bob.fyi" }],
	},
	twitter: {
		card: "summary_large_image",
		title: "Robert (Bob) Weisbecker",
		description: "Bob Weisbecker is a systems & product designer at EVERFI",
		images: ["/assets/share.png"],
	},
	icons: {
		icon: "/assets/favicon.ico",
		apple: "/assets/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={interVariable.variable} suppressHydrationWarning>
			<head>
				<Script src="https://www.googletagmanager.com/gtag/js?id=UA-100486484-1" strategy="afterInteractive" />
				<Script id="gtag-init" strategy="afterInteractive">
					{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','UA-100486484-1',{send_page_view:false});`}
				</Script>
			</head>
			<body className="antialiased safe-area-inset-bottom relative min-h-[calc(100vh-env(safe-area-inset-bottom))] max-w-screen overflow-x-clip scroll-smooth bg-sidebar">
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<a
						href="#main"
						className="sr-only focus:absolute focus:z-100 focus:h-12 focus:bg-card focus:grid focus:place-items-center focus:px-4 text-sm font-medium focus:not-sr-only top-0 left-0">
						Skip to main content
					</a>
					<Header />
					<main id="main" className="mx-auto max-w-4xl px-4 sm:px-8 pb-16">
						{children}
					</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
