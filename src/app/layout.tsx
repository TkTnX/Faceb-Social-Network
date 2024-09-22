import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/Providers";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Faceb | Social Network",
  description: "Feceb | Social Network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={font.className}>
          <Header />
          {children}
        </body>
      </html>
    </Providers>
  );
}
