import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ben Jackson-Cook",
  description: "Ben Jackson-Cook — Songwriter / Producer / Musical Director / Touring Keys Player",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
