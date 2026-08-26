"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, FileText, QrCode, Play, Cpu, Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<"clean" | "fraud">("clean");

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Top Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Next-Gen Circularity • Continuous Document Verification &amp; Traceability</span>
          </motion.div>

          {/* Main Title Hook */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
          >
            If a T-shirt says it contains 80% recycled cotton,{" "}
            <span className="text-gradient">who verifies the 80%?</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            Evidence supporting recycled claims is fragmented across lab certificates, invoices, weighbridge slips, and mill records.
            <span className="text-white font-medium"> TexTrace AI</span> automatically extracts, audits mass-balance conservation, flags fraud, and generates tamper-evident Digital Product Passports.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/audit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-base shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 group transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Live Audit Demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/dpp/TX-000184"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel hover:bg-slate-800/80 text-white font-semibold text-base flex items-center justify-center gap-2 border border-slate-700 hover:border-emerald-500/50 transition-all"
            >
              <QrCode className="w-5 h-5 text-emerald-400" />
              <span>Explore Digital Product Passport</span>
            </Link>
          </motion.div>

          {/* Stats quick row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <div className="glass-panel p-4 rounded-2xl border-slate-800 text-left">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">100%</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Mass-Balance Reconciled</div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border-slate-800 text-left">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">&lt; 3.0s</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">AI Document Extraction</div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border-slate-800 text-left">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">0% Fictitious</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Phantom Yield Blocked</div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border-slate-800 text-left">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">EU DPP</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Audit-Ready Compliance</div>
            </div>
          </motion.div>
        </div>

        {/* Live Interactive Hero Demo Sandbox Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 max-w-5xl mx-auto rounded-3xl p-1 bg-gradient-to-b from-slate-700/60 via-slate-800/30 to-emerald-500/20 shadow-2xl"
        >
          <div className="rounded-[22px] bg-slate-950/90 backdrop-blur-xl p-6 sm:p-8 border border-slate-800/80">
            {/* Header with Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    Automated Material Audit Engine
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                      v2.4 Active
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">Live simulation comparing authentic vs manipulated supply chains</p>
                </div>
              </div>

              {/* Scenario Toggle */}
              <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setActiveTab("clean")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    activeTab === "clean"
                      ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Clean Transaction (Pass)
                </button>
                <button
                  onClick={() => setActiveTab("fraud")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    activeTab === "fraud"
                      ? "bg-red-500 text-white shadow-md shadow-red-500/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Manipulated Fraud (Fail)
                </button>
              </div>
            </div>

            {/* Interactive Preview Body */}
            {activeTab === "clean" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 items-center">
                {/* Step 1: Input */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-emerald-400 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" /> Tier 1 Mill Scrap
                    </span>
                    <span className="font-mono">Tirupur, India</span>
                  </div>
                  <div className="text-xl font-bold text-white">10,000 kg</div>
                  <div className="text-xs text-slate-300 space-y-1">
                    <div>• 78.4% Cotton / 21.6% PET</div>
                    <div>• RCS v2.0 Scope Valid</div>
                    <div>• Moisture Tare: -80 kg</div>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium bg-emerald-950/60 px-2 py-1 rounded border border-emerald-500/20">
                    ✓ Verified Inbound Net: 9,920 kg
                  </div>
                </div>

                {/* Step 2: Engine Audit */}
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3 relative overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-400">Mass Balance Audit</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                      Δ 0.00 kg
                    </span>
                  </div>
                  <div className="text-2xl font-black text-emerald-300">82.66% Recovery</div>
                  <div className="text-xs text-slate-300 space-y-1 font-mono">
                    <div className="flex justify-between">
                      <span>Processing Loss:</span>
                      <span className="text-slate-400">1,720 kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recycled Output:</span>
                      <span className="text-emerald-400 font-bold">8,200 kg</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Conservation Law Satisfied
                  </div>
                </div>

                {/* Step 3: Output Pass */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">Verified Record (VCR)</span>
                    <span className="font-mono text-emerald-400">TX-000184</span>
                  </div>
                  <div className="text-lg font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    VERIFIED BATCH
                  </div>
                  <div className="text-xs text-slate-400 space-y-1">
                    <div>• AI Risk Rating: <strong className="text-emerald-400">LOW</strong></div>
                    <div>• Digital Passport: <strong className="text-white">Generated</strong></div>
                    <div>• CO₂ Avoided: <strong className="text-slate-200">21,320 kg</strong></div>
                  </div>
                  <Link
                    href="/dpp/TX-000184"
                    className="block text-center text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 py-2 rounded-xl border border-emerald-500/30 transition-colors"
                  >
                    Inspect Public QR Passport →
                  </Link>
                </div>
              </div>
            ) : (
              /* Fraud / High Risk Tab */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 items-center">
                {/* Step 1: Input */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-red-400 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" /> Surat Waste Trader
                    </span>
                    <span className="font-mono text-red-400">INV-SUR-1102</span>
                  </div>
                  <div className="text-xl font-bold text-white">10,000 kg Input</div>
                  <div className="text-xs text-slate-300 space-y-1">
                    <div>• Declared: 60% Cotton / 40% PET</div>
                    <div className="text-red-400 font-semibold">• GRS Cert Expired (June 2025)</div>
                    <div>• Inbound Net: 9,950 kg</div>
                  </div>
                  <div className="text-[11px] text-red-400 font-medium bg-red-950/60 px-2 py-1 rounded border border-red-500/30">
                    ⚠️ Expired Certification Attached
                  </div>
                </div>

                {/* Step 2: Engine Audit Alert */}
                <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/40 space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-red-400 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                      CRITICAL ANOMALY
                    </span>
                    <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-mono text-[10px]">
                      HIGH RISK
                    </span>
                  </div>
                  <div className="text-2xl font-black text-red-400">125.6% Claimed Output</div>
                  <div className="text-xs text-slate-300 space-y-1 font-mono">
                    <div className="flex justify-between text-red-300">
                      <span>Claimed Yarn Output:</span>
                      <span className="font-bold">12,500 kg</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Verified Net Input:</span>
                      <span>9,950 kg</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-red-300 font-semibold">
                    🚨 Impossible Yield: Claimed Output &gt; Input (+2,550 kg Phantom Mass)
                  </div>
                </div>

                {/* Step 3: Block Output */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-red-500/30 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300">Audit Status</span>
                    <span className="font-mono text-red-400">BLOCKED</span>
                  </div>
                  <div className="text-lg font-bold text-red-400 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    CLAIM REJECTED
                  </div>
                  <div className="text-xs text-slate-400 space-y-1">
                    <div>• AI Risk Rating: <strong className="text-red-400">CRITICAL</strong></div>
                    <div>• Greenwashing Alert: <strong className="text-red-300">Triggered</strong></div>
                    <div>• Recycling Passport: <strong className="text-red-400">Blocked</strong></div>
                  </div>
                  <Link
                    href="/audit?scenario=fraud-manipulated-chain"
                    className="block text-center text-xs font-semibold text-red-300 hover:text-white bg-red-500/20 hover:bg-red-500/30 py-2 rounded-xl border border-red-500/40 transition-colors"
                  >
                    View Forensic Discrepancy Breakdown →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
