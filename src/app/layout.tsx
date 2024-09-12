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
  title: "E-Crescendo",
  description: "E-CreScendo Registration Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://scontent.fdel11-4.fna.fbcdn.net/v/t39.30808-6/327161510_597989052337515_7104703843847278293_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=ANySIjBKGDMQ7kNvgHyBCaH&_nc_ht=scontent.fdel11-4.fna&_nc_gid=Ao2cGpscj3Jxvi3I9V9UvB0&oh=00_AYAaRRAXQXpa8j3zNZkERMaA68_uzwKcSWSMUzdTaLEOLQ&oe=66E8BDDB" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

