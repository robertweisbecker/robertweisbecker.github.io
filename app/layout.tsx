import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Agentation } from "agentation";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const Departure_Mono = localFont({
  variable: "--font-departure-mono",
  display: "swap",
  src: [{ path: "./fonts/DepartureMono-Regular.woff2", style: "normal" }],
});

const Display = localFont({
  variable: "--font-display",
  display: "swap",
  src: [{ path: "./fonts/SeasonCollectionVFT.woff2", style: "normal" }],
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Robert (Bob) Weisbecker",
    description: "Bob Weisbecker is a systems & product designer at Everfi",
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
    <html lang="en" className={`${Departure_Mono.variable} ${Display.variable}`} suppressHydrationWarning>
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=UA-100486484-1" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','UA-100486484-1',{send_page_view:false});`}
        </Script>
      </head>
      <body className="safe-area-inset-bottom relative min-h-[calc(100vh-env(safe-area-inset-bottom))] max-w-screen overflow-x-clip scroll-smooth font-sans antialiased">
        <div
          className="gradient-anim fixed inset-x-0 top-0 bottom-0 -z-100 max-md:hidden"
          style={
            {
              // backgroundImage: "radial-gradient(circle,var(--border) 1px,#0000 0)",
              // backgroundSize: ".5rem .5rem",
              // maskImage: "radial-gradient(50% 100% at 0% 100%, rgb(0, 0, 0) 60%, transparent 100%)",
              // "--s": "50vh",
              // "--c1": "var(--muted)",
              // "--c2": "var(--background)",
              // "--_g": "var(--c1) 35%, #0000 36%",
              // background: "radial-gradient(at 100% 100%, var(--_g)), radial-gradient(at 0 0, var(--_g)) var(--c2)",
              // backgroundSize: "var(--s) var(--s)",
            } as React.CSSProperties
          }
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#main"
            className="sr-only top-0 left-0 text-sm font-medium focus:not-sr-only focus:absolute focus:z-100 focus:grid focus:h-12 focus:place-items-center focus:bg-card focus:px-4"
          >
            Skip to main content
          </a>

          <Header />
          <main id="main" className="root container mx-auto scroll-pt-20 px-4 py-20">
            {children}
          </main>
          <Footer />
          {/* {process.env.NODE_ENV === "development" && <DevMeasurer />} */}
          {process.env.NODE_ENV === "development" && <Agentation endpoint="http://localhost:4747" />}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
