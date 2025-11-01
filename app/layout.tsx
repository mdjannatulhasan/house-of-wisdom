import type { Metadata } from 'next';
import { Red_Hat_Display } from 'next/font/google';
import './globals.css';
import Providers from './Providers';

const redHatDisplay = Red_Hat_Display({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Book Library',
  description: 'A comprehensive book library management system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={redHatDisplay.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
