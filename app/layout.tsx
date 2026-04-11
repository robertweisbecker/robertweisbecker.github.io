import { DevMeasurer } from "@/components/dev-measurer";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Agentation } from "agentation";
import type { Metadata } from "next";
import localFont from "next/font/local";
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

const Booton = localFont({
  variable: "--font-booton",
  display: "swap",
  src: [{ path: "./fonts/BootonVF.woff2", style: "normal" }],
});

const Departure_Mono = localFont({
  variable: "--font-departure-mono",
  display: "swap",
  src: [{ path: "./fonts/DepartureMono-Regular.woff2", style: "normal" }],
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
    <html
      lang="en"
      className={`${Inter_Variable.variable} ${Departure_Mono.variable} ${Booton.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=UA-100486484-1" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','UA-100486484-1',{send_page_view:false});`}
        </Script>
      </head>
      <body className="safe-area-inset-bottom relative min-h-[calc(100vh-env(safe-area-inset-bottom))] max-w-screen overflow-x-clip scroll-smooth font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#main"
            className="sr-only top-0 left-0 text-sm font-medium focus:not-sr-only focus:absolute focus:z-100 focus:grid focus:h-12 focus:place-items-center focus:bg-card focus:px-4"
          >
            Skip to main content
          </a>

          <Header />
          <main id="main" className="root mx-auto scroll-pt-20 bg-background py-20">
            {/* bg-[image:linear-gradient(to_bottom,var(--background)_50%,transparent_50%),repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[8px_8px] px-4 py-20 [--pattern-bg:var(--border)]/5 [--pattern-fg:var(--border)] */}
            {/* <div
              className="absolute inset-0 z-0 max-h-[33vh]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 0",
                maskImage:
                  "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px), radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
                WebkitMaskImage:
                  "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px), radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            /> */}

            {children}
          </main>
          <Footer />
          {process.env.NODE_ENV === "development" && <DevMeasurer />}
          {process.env.NODE_ENV === "development" && <Agentation endpoint="http://localhost:4747" />}
        </ThemeProvider>
      </body>
    </html>
  );
}
