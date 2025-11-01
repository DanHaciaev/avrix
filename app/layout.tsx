import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/bottomPart/footer";
import ScrollToTop from "./components/scrollToTop";


const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Avrix",
  description: "Avrix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${hostGrotesk.variable} antialiased`}
      >
        <ScrollToTop />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}