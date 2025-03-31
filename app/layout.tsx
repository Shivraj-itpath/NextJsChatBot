import type { Metadata } from "next";
import "./globals.css";
import { rubik } from "@/styles/font";

export const metadata: Metadata = {
  title: "GenieX",
  description: "Created with v0",
  generator: "v0.dev",
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
          href="https://cdn-icons-png.flaticon.com/128/2579/2579243.png"
        />
      </head>
      <body className={`${rubik.className} antialiased`}>
        {children}
        <script
          src="https://kit.fontawesome.com/1322ec7b78.js"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
