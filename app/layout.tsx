import './globals.css';
import { NextAuthProvider } from './providers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Psychic Tarot Andrew',
  description: 'Token-based Tarot readings with GPT.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <main className="flex flex-col items-center p-4">
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
