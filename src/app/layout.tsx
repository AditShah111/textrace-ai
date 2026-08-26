import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { ShieldCheck, Cpu, FileCheck, Layers, QrCode, ArrowRight, Sparkles, Coins } from "lucide-react";

export const metadata: Metadata = {
  title: "TexTrace AI | Automated Document Verification & Digital Circularity Platform",
  description:
    "TexTrace AI converts fragmented textile supply chain evidence into a continuously verified digital chain of custody with AI document intelligence and mass-balance reconciliation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
        {/* Top Notification Banner */}
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-amber-950/80 border-b border-emerald-500/20 py-2 px-4 text-xs text-center text-emerald-300 font-medium flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>
            <strong>TexTrace AI Enterprise v2.4</strong> — Automated AI Document Verification &amp; Verifiable Circularity Credits
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 bg-emerald-500/20 rounded text-[10px] text-emerald-300 font-mono">
            1 TRC = 1 kg Verified Fiber
          </span>
        </div>

        {/* Global Navigation Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6 text-slate-950 font-bold" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  TexTrace <span className="text-emerald-400 font-mono text-sm px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">AI</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                  Circularity &amp; Credit Registry
                </span>
              </div>
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-slate-300">
              <Link
                href="/"
                className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors"
              >
                Overview
              </Link>
              <Link
                href="/audit"
                className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5 text-emerald-400 font-semibold"
              >
                <Cpu className="w-4 h-4" />
                AI Audit Engine
              </Link>
              <Link
                href="/credits"
                className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5 text-amber-400 font-semibold"
              >
                <Coins className="w-4 h-4" />
                Circularity Credits
              </Link>
              <Link
                href="/dashboard"
                className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                Compliance Hub
              </Link>
              <Link
                href="/dpp/TX-000184"
                className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
              >
                <QrCode className="w-4 h-4 text-emerald-400" />
                Digital Passport
              </Link>
            </nav>

            {/* Action CTA */}
            <div className="flex items-center gap-3">
              <Link
                href="/credits"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-semibold text-sm shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all hover:scale-105"
              >
                <Coins className="w-4 h-4" />
                <span>Credit Registry</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>

        {/* Global Footer */}
        <footer className="border-t border-slate-800 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-400 flex items-center justify-center text-slate-950 font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold text-white">TexTrace AI</span>
              </div>
              <p className="text-sm text-slate-400 max-w-md leading-relaxed">
                Automated AI Document Verification and Digital Circularity Credit Registry for global fashion supply chains. Minting tamper-evident material credits backed by physical mass conservation.
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400 pt-2">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span> 1 TRC = 1 kg Verified Fiber</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span> RCS &amp; GRS Interoperable</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span> EU DPP Standard</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                Platform Capabilities
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/audit" className="hover:text-emerald-400 transition-colors">AI Document Intelligence</Link></li>
                <li><Link href="/audit" className="hover:text-emerald-400 transition-colors">Mass-Balance Reconciliation</Link></li>
                <li><Link href="/credits" className="hover:text-amber-400 transition-colors">Circularity Credit Registry</Link></li>
                <li><Link href="/credits" className="hover:text-amber-400 transition-colors">TRC Token Minting &amp; Burn</Link></li>
                <li><Link href="/dpp/TX-000184" className="hover:text-emerald-400 transition-colors">Digital Product Passport (DPP)</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                Interactive Demos
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/audit?scenario=clean-indian-chain" className="hover:text-emerald-400 transition-colors">Verified Supply Chain Audit</Link></li>
                <li><Link href="/audit?scenario=fraud-manipulated-chain" className="hover:text-emerald-400 transition-colors">Mass Anomaly &amp; Discrepancy Detection</Link></li>
                <li><Link href="/credits" className="hover:text-amber-400 transition-colors">Retire / Burn Circularity Credits</Link></li>
                <li><Link href="/dpp/TX-000184" className="hover:text-emerald-400 transition-colors">Scan Batch TX-000184 Hangtag</Link></li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <p>© 2026 TexTrace AI. Enterprise Textile Circularity &amp; Verification Platform.</p>
            <p className="font-mono text-slate-400">VeriEngine Protocol v2.4 | SHA-256 Cryptographic Token Engine</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
