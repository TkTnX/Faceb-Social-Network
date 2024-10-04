import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Providers from "@/components/Providers";
import { Sidebar } from "@/components";
import { Toaster } from "react-hot-toast";

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
          <Toaster />
          <Header />
          <Sidebar />
          <main className="bg-[#f7f7fa] pt-5 md:ml-[75px]">{children}</main>
        </body>
      </html>
    </Providers>
  );
}
