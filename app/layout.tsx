import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Script from "next/script";
import "./globals.css";

const inter = localFont({
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
  description:
    "Call me Bob. I'm currently designing design systems & systems for designers at EVERFI from Blackbaud.",
  openGraph: {
    title: "Robert (Bob) Weisbecker",
    description:
      "Call me Bob. I'm currently designing design systems & systems for designers at EVERFI from Blackbaud.",
    url: "https://bob.fyi",
    siteName: "bob.fyi",
    locale: "en_US",
    type: "website",
    images: [{ url: "/assets/share.png", alt: "Bob Weisbecker | bob.fyi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robert (Bob) Weisbecker",
    description:
      "Call me Bob. I'm currently designing design systems & systems for designers at EVERFI from Blackbaud.",
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
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=UA-100486484-1"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','UA-100486484-1',{send_page_view:false});`}
        </Script>
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="mx-auto max-w-4xl px-4 pb-16">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
