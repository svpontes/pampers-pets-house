import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// IMPORTANDO OS COMPONENTES
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import AuthProvider from "@/src/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pamper's Pets House",
  description: "Caring for your Pets",
};

// ATENÇÃO: Aqui não usamos 'use client' nem 'useSession'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* O AuthProvider envolve tudo para permitir que a Navbar use a sessão */}
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}