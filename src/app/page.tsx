import React from "react";
import CleanMinimalApp from "@/components/CleanMinimalApp";
import { Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Clean Minimalist Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-4 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Automated Verification &amp; Circularity Credits</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Verify Recycled Textiles.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
            Issue Verifiable Credits.
          </span>
        </h1>

        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          AI forensic document verification and mass-balance reconciliation for global textile supply chains.
        </p>
      </section>

      {/* Main Interactive App */}
      <section className="w-full">
        <CleanMinimalApp />
      </section>
    </div>
  );
}
