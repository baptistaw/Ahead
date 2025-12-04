import type { Metadata } from 'next';
import { Montserrat, Source_Sans_3 } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { esES } from '@clerk/localizations';
import './globals.css';

// Tipografía principal (branding / títulos) - Manual de Marca
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

// Tipografía secundaria (texto corrido) - Manual de Marca
const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AHEAD Staff - Clínica Integral de Optimización Quirúrgica',
  description: 'Panel de gestión para profesionales de la salud - AHEAD Prehabilitación y Recuperación Acelerada para Cirugía Mayor',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="es" suppressHydrationWarning>
        <body className={`${montserrat.variable} ${sourceSans.variable} font-sans`} suppressHydrationWarning>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
