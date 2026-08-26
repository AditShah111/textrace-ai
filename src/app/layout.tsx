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
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
        {/* Simple Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-slate-950 font-bold" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-white">TexTrace</span>
                <span className="text-emerald-400 font-mono text-xs px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">AI</span>
              </div>
            </Link>

            {/* Simple Clean Links */}
            <nav className="flex items-center gap-3 text-xs font-medium text-slate-300">
              <Link href="/" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition-colors">
                Workspace
              </Link>
              <Link href="/credits" className="px-3 py-1.5 rounded-lg hover:text-amber-400 hover:bg-slate-800 transition-colors flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>Credit Registry</span>
              </Link>
              <Link href="/dpp/TX-000184" className="px-3 py-1.5 rounded-lg hover:text-emerald-400 hover:bg-slate-800 transition-colors flex items-center gap-1">
                <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                <span>Digital Passport</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>

        {/* Minimal Footer */}
        <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
          <p>© 2026 TexTrace AI • Enterprise Textile Verification &amp; Circularity Credits</p>
        </footer>
      </body>
    </html>
  );
}
