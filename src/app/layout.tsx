import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import clsx from "clsx";
import Footer from "@/components/ui/footer";

const fraunces = Fraunces({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "swizzl",
  description: "A cocktail recipe library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍹</text></svg>"
        />
      </head>
      <body className={clsx(fraunces.className, "text-base font-light")}>
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
