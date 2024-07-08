import "@/app/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Wordle Clone",
  description: "Created by Ola",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-50 dark:bg-zinc-900">{children}</body>
    </html>
  );
}
