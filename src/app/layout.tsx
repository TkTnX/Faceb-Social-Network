import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Header from "@/components/Header/Header";
import Providers from "@/components/Providers";
import { Sidebar } from "@/components";
import { Toaster } from "react-hot-toast";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
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
      <html suppressHydrationWarning={true} lang="en">
        <body className={font.className}>
          <NextThemesProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <NextTopLoader />
            <Header />
            <Sidebar />
            <main className=" pt-5 md:ml-[75px]">{children}</main>
          </NextThemesProvider>
        </body>
      </html>
    </Providers>
  );
}
