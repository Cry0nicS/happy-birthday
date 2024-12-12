import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Happy Birthday, Jarla!",
  description: "A special message to celebrate Jarla's birthday 🎉.",
  openGraph: {
    title: "Happy Birthday, Jarla!",
    description: "A special message to celebrate Jarla's birthday 🎉.",
    images: [
      {
        url: "/banner.webp", // Add this image to the public folder
        width: 1200,
        height: 630,
        alt: "Happy Birthday, Jarla! 🎉",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
