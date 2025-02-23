import "@radix-ui/themes/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Container, Flex, Theme } from "@radix-ui/themes";
import { Header } from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yapp | Revolut",
  description: "Yodl mini-app (Yapp). Off-ramp to Revolut",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Theme accentColor='iris' grayColor='sand' panelBackground='translucent' radius='medium' appearance='dark'>
          <Container size='1' minHeight='100vh' px='4'>
            <Header />
            {children}
          </Container>
        </Theme>
      </body>
    </html>
  );
}
