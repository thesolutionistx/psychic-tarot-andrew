# app/layout.tsx
import './globals.css';
import { Metadata } from 'next';
import { NextAuthProvider } from './providers';

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
