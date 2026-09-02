import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LoadingWrapper from "../components/LoadingWrapper";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "AWS Student Builder Group (GGSIPU EDC)",
  description: "Official website of AWS Student Builder Group at GGSIPU East Delhi Campus",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preload" href="/homePage.svg" as="image" />
        <link rel="preload" href="/productivity.svg" as="image" />
        <link rel="preload" href="/Description.svg" as="image" />
        <link rel="preload" href="/Punchline.svg" as="image" />
      </head>
      <body
        className={`${inter.variable} antialiased p-0 m-0 select-none font-inter bg-[#030012] overflow-x-hidden w-full`}
        style={{
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          userSelect: 'none',
          maxWidth: '100vw'
        } as React.CSSProperties}
      >
        <LoadingWrapper>
          <Navbar />
          {children}
          <Footer />
        </LoadingWrapper>
      </body>
    </html>
  );
}
