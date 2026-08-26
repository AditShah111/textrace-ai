import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { ShieldCheck, Coins, QrCode } from "lucide-react";

export const metadata: Metadata = {
  title: "TexTrace AI | Automated Verification & Circularity Credits",
  description: "AI document verification and mass-balance reconciliation for global textile supply chains.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
        {/* Crisp Clean Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-white font-bold" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-slate-900">TexTrace</span>
                <span className="text-emerald-700 font-mono text-xs px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 font-bold">AI</span>
              </div>
            </Link>

            {/* Simple Clean Navigation */}
            <nav className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <Link href="/" className="px-3 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors">
                Workspace
              </Link>
              <Link href="/credits" className="px-3 py-1.5 rounded-lg hover:text-amber-700 hover:bg-amber-50 transition-colors flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-amber-600" />
                <span>Credit Registry</span>
              </Link>
              <Link href="/dpp/TX-000184" className="px-3 py-1.5 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition-colors flex items-center gap-1">
                <QrCode className="w-3.5 h-3.5 text-emerald-600" />
                <span>Digital Passport</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>

        {/* Crisp Light Footer */}
        <footer className="border-t border-slate-200 bg-white py-8 px-4 text-center text-xs text-slate-500">
          <p>© 2026 TexTrace AI • Enterprise Textile Verification &amp; Circularity Credits</p>
        </footer>
      </body>
    </html>
  );
}
