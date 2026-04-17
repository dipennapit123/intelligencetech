import type { Metadata } from "next";
import "./globals.css";

import { NavLoader } from "@/components/stitch/NavLoader";
import { FooterLoader } from "@/components/stitch/FooterLoader";

export const metadata: Metadata = {
  metadataBase: new URL("https://intelligencetech.com"),
  title: {
    default: "Intelligence Tech",
    template: "%s · Intelligence Tech",
  },
  description:
    "A scalable SaaS ecosystem: products, platform updates, and SEO-optimized engineering blogs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Saira+Stencil:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface font-body selection:bg-primary-container/30 min-h-full flex flex-col antialiased">
        <NavLoader />
        <main className="flex-1">{children}</main>
        <FooterLoader />
      </body>
    </html>
  );
}
