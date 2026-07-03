import "@/styles/globals.css";
import type { Metadata } from "next";
import type { Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollReset } from "@/components/scroll-reset";
import { PageViewTransition } from "@/components/view-transitions";

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
  description: "Bob is a product & systems designer at Everfi.",
  openGraph: {
    title: "bob.fyi",
    description: "Bob is a product & systems designer at Everfi.",
    url: "https://bob.fyi",
    siteName: "bob.fyi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "bob.fyi",
    description: "Bob is a product & systems designer at Everfi.",
  },
  icons: {
    icon: "/assets/favicon.ico",
    apple: "/assets/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#2f2615" },
  ],
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${Departure_Mono.variable} ${Display.variable}`} suppressHydrationWarning>
      <body className="safe-area-inset-bottom relative min-h-[calc(100vh-env(safe-area-inset-bottom))] max-w-screen overflow-x-clip scroll-smooth font-sans antialiased">
        <ScrollReset />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#main"
            className="sr-only top-0 left-0 text-sm font-medium focus:not-sr-only focus:absolute focus:z-100 focus:grid focus:h-12 focus:place-items-center focus:bg-card focus:px-4"
          >
            Skip to main content
          </a>

          <Header />
          <main id="main" className="container mx-auto scroll-pt-20 px-4 py-12 md:py-20">
            <PageViewTransition>
              <div className="root isolate">{children}</div>
            </PageViewTransition>
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
