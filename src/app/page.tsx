import React from "react";
import Link from "next/link";
import HeroSection from "@/components/landing/HeroSection";
import MassBalanceVisualizer from "@/components/landing/MassBalanceVisualizer";
import ProblemSolution from "@/components/landing/ProblemSolution";
import DppShowcase from "@/components/landing/DppShowcase";
import RoiCalculator from "@/components/landing/RoiCalculator";
import TrustStandards from "@/components/landing/TrustStandards";
import { ArrowRight, Play, QrCode, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Interactive Mass-Balance Engine Visualizer */}
      <MassBalanceVisualizer />

      {/* 3. Problem vs Solution Grid */}
      <ProblemSolution />

      {/* 4. Digital Product Passport Showcase */}
      <DppShowcase />

      {/* 5. Circularity ROI Calculator */}
      <RoiCalculator />

      {/* 6. Standards & Compliance Ecosystem */}
      <TrustStandards />

      {/* 7. Final Call to Action Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-950 via-emerald-950/20 to-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for Continuous Audit</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Stop Guessing Recycled Content. <br />
            <span className="text-gradient">Start Verifying Evidence.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Experience the automated textile waste verification engine. Run our simulated clean and fraudulent transactions or upload your own mill certificates.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/audit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-base shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Live Audit Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel hover:bg-slate-800 text-white font-semibold text-base flex items-center justify-center gap-2 border border-slate-700 hover:border-emerald-500/40 transition-colors"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>View Compliance Dashboard</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-6">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Pre-loaded sample PDFs included</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant VCR generation</span>
          </div>
        </div>
      </section>
    </div>
  );
}
