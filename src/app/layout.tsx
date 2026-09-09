import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LoadingWrapper from "../components/LoadingWrapper";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackgroundWrapper";

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
        <AnimatedBackground />
        {/* Ambient floating orbs — large, bright, and prominent */}
        <div className="ambient-orb" style={{ width: 550, height: 550, background: 'rgba(132, 58, 237, 0.25)', top: '5%', left: '-8%', animationDelay: '0s' }} />
        <div className="ambient-orb" style={{ width: 450, height: 450, background: 'rgba(67, 73, 255, 0.2)', top: '40%', right: '-6%', animationDelay: '5s' }} />
        <div className="ambient-orb" style={{ width: 400, height: 400, background: 'rgba(139, 92, 246, 0.18)', bottom: '10%', left: '15%', animationDelay: '10s' }} />
        <div className="ambient-orb" style={{ width: 350, height: 350, background: 'rgba(168, 85, 247, 0.15)', top: '70%', right: '20%', animationDelay: '15s' }} />
        <div className="ambient-orb" style={{ width: 300, height: 300, background: 'rgba(79, 70, 229, 0.2)', top: '20%', left: '50%', animationDelay: '8s' }} />
        {/* Nebula blobs — slow rotating, ethereal */}
        <div className="nebula-blob" style={{ width: 600, height: 600, background: 'rgba(99, 102, 241, 0.15)', top: '25%', right: '10%', animationDelay: '3s' }} />
        <div className="nebula-blob" style={{ width: 500, height: 500, background: 'rgba(176, 106, 224, 0.12)', bottom: '20%', left: '-8%', animationDelay: '12s' }} />
        <div className="nebula-blob" style={{ width: 450, height: 450, background: 'rgba(132, 58, 237, 0.1)', top: '60%', left: '40%', animationDelay: '20s' }} />
        {/* Vignette */}
        <div className="vignette-overlay" />
        <LoadingWrapper>
          <Navbar />
          {children}
          <Footer />
        </LoadingWrapper>
      </body>
    </html>
  );
}
