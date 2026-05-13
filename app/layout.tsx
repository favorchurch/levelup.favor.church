import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LEVEL UP — Favor Church",
  description: "21-day spiritual challenge. Abide. Renewed. Battle.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#131313",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${montserrat.variable} ${inter.variable}`}>
      <body className="bg-background text-on-background font-body-md min-h-screen">
        {children}
      </body>
    </html>
  );
}
