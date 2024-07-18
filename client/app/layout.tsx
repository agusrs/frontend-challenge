import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import { config } from "@fortawesome/fontawesome-svg-core";
import "./globals.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Meli challenge",
    default: "Meli challenge",
  },
  description: "Meli front-end challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
