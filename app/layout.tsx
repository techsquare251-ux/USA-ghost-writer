import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://liblit.com"),
  title: {
    default: "Liblit Books Publishing",
    template: "%s | Liblit Books Publishing",
  },
  description:
    "Professional self-publishing services for authors who want premium results.",
  openGraph: {
    type: "website",
    siteName: "Liblit Books Publishing",
    title: "Liblit Books Publishing",
    description:
      "Professional self-publishing services for authors who want premium results.",
    url: "https://liblit.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Liblit Books Publishing",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-brand-cream font-sans text-brand-charcoal antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
