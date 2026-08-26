import React from "react";
import { XCircle, CheckCircle2, ShieldAlert, Cpu, FileCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProblemSolution() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <span>The Compliance Dilemma</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Fragmented PDFs vs. Continuous AI Verification
          </h2>
          <p className="text-base text-slate-300">
            Global fashion brands face multimillion-dollar regulatory fines for unverified recycled claims. TexTrace AI replaces manual spot checks with an automated auditor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem Card */}
          <div className="glass-panel p-8 rounded-3xl border-red-500/20 bg-gradient-to-b from-red-950/20 via-slate-900/40 to-slate-950/60 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Status Quo: Fragmented Evidence</h3>
                <p className="text-xs text-red-400 font-medium">Unchecked greenwashing &amp; compliance exposure</p>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Isolated PDF silos:</strong> Weighbridge slips, invoices, and lab certificates are stored in disconnected email inboxes and folders.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Phantom recycled yield:</strong> Mill claims 12,500 kg recycled output from 10,000 kg input without mass conservation checks.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Expired scope certificates:</strong> Facilities use expired GRS/RCS certificates without real-time validity checks.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Massive audit cost:</strong> Brands spend weeks manually checking batch paperwork before seasonal ESG reporting.</span>
              </li>
            </ul>

            <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/30 text-xs text-red-200">
              ❌ High risk of EU Green Claims Directive fines &amp; brand reputation damage.
            </div>
          </div>

          {/* Solution Card */}
          <div className="glass-panel p-8 rounded-3xl border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 via-slate-900/40 to-slate-950/60 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">TexTrace AI: Continuous Audit Engine</h3>
                <p className="text-xs text-emerald-400 font-medium">Automated reconciliation &amp; digital product passports</p>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>AI Document Intelligence:</strong> Ingests lab reports, invoices, mill sheets, and automatically extracts key specs &amp; fiber blends.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Conservation of Mass Audit:</strong> Strict mass-balance reconciliation across tier 1 waste to yarn output with zero tolerance for phantom mass.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Live Certificate Validation:</strong> Real-time cross-referencing of RCS/GRS certification scope and expiry dates.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Verified Circularity Records (VCR):</strong> Tamper-evident cryptographic records linked to interactive QR Digital Product Passports.</span>
              </li>
            </ul>

            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200">
              ✓ 100% audit-ready compliance for EU DPP, FTC Green Guides &amp; global retailers.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
