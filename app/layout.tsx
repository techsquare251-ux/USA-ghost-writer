import type { Metadata } from "next";
import { Inter, Playfair_Display, DM_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Chatbot from "@/components/chatbot/Chatbot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-mono",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://usaghostwriter.com"),
  title: {
    default: "USA Ghost Writer",
    template: "%s | USA Ghost Writer",
  },
  description:
    "Professional self-publishing services for authors who want premium results.",
  openGraph: {
    type: "website",
    siteName: "USA Ghost Writer",
    title: "USA Ghost Writer",
    description:
      "Professional self-publishing services for authors who want premium results.",
    url: "https://usaghostwriter.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "USA Ghost Writer",
    description:
      "Professional self-publishing services for authors who want premium results.",
  },
  alternates: {
    canonical: "/",
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
      className={`${inter.variable} ${playfair.variable} ${dmMono.variable} ${cormorant.variable}`}
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/hero-bg2.jpeg" fetchPriority="high" />
        <link rel="me" href="https://www.linkedin.com/company/usa-ghost-writer" />
        <link rel="me" href="https://twitter.com/usaghostwriter" />
      </head>
      <body className="bg-brand-cream font-sans text-brand-charcoal antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Chatbot />
        </div>
      </body>
    </html>
  );
}
