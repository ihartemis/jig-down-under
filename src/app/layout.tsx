import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JIG Down Under — NZ & Australia 2026",
  description:
    "Follow Ingrid, Julian & Griffin on their road trip through New Zealand's South Island and Melbourne. April 4–20, 2026.",
  openGraph: {
    title: "JIG Down Under — NZ & Australia 2026",
    description:
      "Follow Ingrid, Julian & Griffin on their road trip through New Zealand's South Island and Melbourne.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Source+Serif+4:ital,opsz,wght@0,8..60,300..700;1,8..60,300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-cream text-charcoal">{children}</body>
    </html>
  );
}
