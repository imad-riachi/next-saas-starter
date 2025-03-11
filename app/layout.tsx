import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { UserProvider } from '@/lib/auth';
import { getUser } from '@/lib/db/queries';

import ThemeProvider from '@/components/theme-provider';

import content from '../content.json';

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userPromise = getUser();

  return (
    <html lang='en' className={`${manrope.className}`} suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider userPromise={userPromise}>{children}</UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
