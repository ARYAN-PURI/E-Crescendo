import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import 'react-phone-input-2/lib/style.css';
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
      <link rel="icon" href="https://scontent.fixc3-1.fna.fbcdn.net/v/t39.30808-1/327161510_597989052337515_7104703843847278293_n.jpg?stp=dst-jpg_s200x200&_nc_cat=102&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=dHTuwaZtTzEQ7kNvgHSbGcH&_nc_ht=scontent.fixc3-1.fna&_nc_gid=Ay4tQaNdccSXm230_xTb7KP&oh=00_AYChHwyWsojnRZP90p3-1s-Iu4vE1pKbyH7sDNdwVK8nhw&oe=66EE6B5D" sizes="any" />
      <link href="https://fonts.googleapis.com/css2?family=Sixtyfour+Convergence&display=swap" rel="stylesheet"/>
      
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

