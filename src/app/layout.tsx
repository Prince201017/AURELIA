import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AURELIA — Haute Joaillerie',
  description: 'AURELIA — contemporary high jewellery shaped by light, platinum and diamonds.',
  openGraph: {
    title: 'AURELIA — Haute Joaillerie',
    description: 'AURELIA — contemporary high jewellery shaped by light, platinum and diamonds.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AURELIA — Haute Joaillerie',
    description: 'AURELIA — contemporary high jewellery shaped by light, platinum and diamonds.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#090807] text-[#eee9df] selection:bg-white/20 selection:text-white">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,200..600;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#090807] text-[#eee9df] overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
