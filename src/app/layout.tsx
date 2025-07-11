import React from "react";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "PustakLink",
  description: "Nepal's Used Book Marketplace",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
