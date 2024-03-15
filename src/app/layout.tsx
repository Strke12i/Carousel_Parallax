import type { Metadata } from "next";
import "./globals.scss";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SpiderVerse",
  description: "Carrossel Paralax do Aranhaverso com Next e Framermotion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <header>
          <Image src="/icons/menu.svg" alt="Menu" width={36} height={25} />
          <Link href={"/"}>
            <Image
              src="/spider-logo.svg"
              alt="spiderman logo"
              width={260}
              height={70}
            />
          </Link>
          <Image src="/icons/user.svg" alt="User" width={36} height={36} />
        </header>
        {children}
      </body>
    </html>
  );
}
