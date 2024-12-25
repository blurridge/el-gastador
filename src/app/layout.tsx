import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "El Gastador",
  description: "A web application for budget tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.className} ${publicSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
