import React from "react";
import Link from "next/link";
import UnifiedCircularityApp from "@/components/UnifiedCircularityApp";
import DppShowcase from "@/components/landing/DppShowcase";
import RoiCalculator from "@/components/landing/RoiCalculator";
import TrustStandards from "@/components/landing/TrustStandards";
import { ShieldCheck, Sparkles, ArrowRight, Play } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Hero Section */}
      <section className="relative pt-10 pb-12 overflow-hidden text-center">
        {/* Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Automated Textile Waste Verification &amp; Circularity Credit Registry</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            If a T-shirt says it contains 80% recycled cotton,{" "}
            <span className="text-gradient">who verifies the 80%?</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            TexTrace AI converts fragmented supply chain documents into a continuously audited digital chain of custody,
            minting verifiable <strong>Textile Recycling Credits (TRCs)</strong> for fashion brands and regulators.
          </p>
        </div>
      </section>

      {/* Main Unified 3-Step Interactive Circularity Application */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <UnifiedCircularityApp />
      </section>

      {/* Supporting Sections */}
      <DppShowcase />
      <RoiCalculator />
      <TrustStandards />
    </div>
  );
}
