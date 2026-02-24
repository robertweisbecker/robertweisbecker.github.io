import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Script from "next/script";
import "./globals.css";

const Inter_Variable = localFont({
	variable: "--font-inter-var",
	display: "swap",
	src: [
		{ path: "./fonts/InterVariable.woff2", style: "normal" },
		{ path: "./fonts/InterVariable-Italic.woff2", style: "italic" },
	],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://bob.fyi"),
	title: "bob dot fyi",
	description: "Bob Weisbecker is a systems & product designer at Everfi",
	openGraph: {
		title: "Robert (Bob) Weisbecker",
		description: "Bob Weisbecker is a systems & product designer at Everfi",
		url: "https://bob.fyi",
		siteName: "bob.fyi",
		locale: "en_US",
		type: "website",
		images: [{ url: "/assets/share.png", alt: "Bob Weisbecker | bob.fyi" }],
	},
	twitter: {
		card: "summary_large_image",
		title: "Robert (Bob) Weisbecker",
		description: "Bob Weisbecker is a systems & product designer at Everfi",
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
		<html
			lang="en"
			className={Inter_Variable.variable}
			suppressHydrationWarning
		>
			<head>
				<Script
					src="https://www.googletagmanager.com/gtag/js?id=UA-100486484-1"
					strategy="afterInteractive"
				/>
				<Script id="gtag-init" strategy="afterInteractive">
					{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','UA-100486484-1',{send_page_view:false});`}
				</Script>
			</head>
			<body className="safe-area-inset-bottom max-w-screen bg-sidebar relative min-h-[calc(100vh-env(safe-area-inset-bottom))] overflow-x-clip scroll-smooth antialiased">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<a
						href="#main"
						className="focus:z-100 focus:bg-card sr-only left-0 top-0 text-sm font-medium focus:not-sr-only focus:absolute focus:grid focus:h-12 focus:place-items-center focus:px-4"
					>
						Skip to main content
					</a>
					<Header />
					<main id="main" className="mx-auto max-w-5xl px-4 pb-16 sm:px-8">
						{children}
					</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
