"use client";

import React from "react";
import { MassBalanceLedger } from "@/types";
import { Scale, ArrowRight, CheckCircle2, AlertTriangle, Info } from "lucide-react";

interface Props {
  ledger: MassBalanceLedger;
}

export default function MassBalanceWaterfall({ ledger }: Props) {
  const isViolated = ledger.recycledYarnProducedKg > ledger.recyclerReceivedKg;

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Mass-Balance Reconciliation Waterfall</h3>
            <p className="text-xs text-slate-400">Physical conservation of mass audit across supply chain stages</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {ledger.isBalanced ? (
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Balanced (0.12% Tol.)
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Mass Violation Detected
            </span>
          )}
        </div>
      </div>

      {/* 5-Step Mass Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Step 1 */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="text-[10px] font-mono uppercase text-emerald-400">1. Waste Generated</div>
          <div className="text-xl font-bold text-white">{ledger.wasteGeneratedKg.toLocaleString()} kg</div>
          <div className="text-[11px] text-slate-400">Mill invoice gross</div>
          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
            Pre-consumer scrap
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="text-[10px] font-mono uppercase text-amber-400">2. Transit Variance</div>
          <div className="text-xl font-bold text-amber-400">-{ledger.transportLossKg.toLocaleString()} kg</div>
          <div className="text-[11px] text-slate-400">
            {((ledger.transportLossKg / ledger.wasteGeneratedKg) * 100).toFixed(1)}% moisture diff
          </div>
          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
            Weighbridge verified
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="text-[10px] font-mono uppercase text-cyan-400">3. Recycler Received</div>
          <div className="text-xl font-bold text-white">{ledger.recyclerReceivedKg.toLocaleString()} kg</div>
          <div className="text-[11px] text-slate-400">Net intake mass</div>
          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
            De-fibering line
          </div>
        </div>

        {/* Step 4 */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="text-[10px] font-mono uppercase text-slate-400">4. Processing Loss</div>
          <div className="text-xl font-bold text-slate-300">-{ledger.processingLossKg.toLocaleString()} kg</div>
          <div className="text-[11px] text-slate-400">Comber noil &amp; dust</div>
          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
            Mechanical spinning loss
          </div>
        </div>

        {/* Step 5 */}
        <div
          className={`p-4 rounded-2xl border space-y-2 ${
            isViolated
              ? "bg-red-950/30 border-red-500/40"
              : "bg-emerald-950/30 border-emerald-500/30"
          }`}
        >
          <div className={`text-[10px] font-mono uppercase font-bold ${isViolated ? "text-red-400" : "text-emerald-300"}`}>
            5. Recycled Yarn Output
          </div>
          <div className={`text-xl font-bold ${isViolated ? "text-red-400" : "text-emerald-400"}`}>
            {ledger.recycledYarnProducedKg.toLocaleString()} kg
          </div>
          <div className={`text-[11px] font-semibold ${isViolated ? "text-red-300" : "text-emerald-300"}`}>
            {ledger.recoveryRatePercent}% Recovery Rate
          </div>
          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
            {isViolated ? "❌ Exceeds Input Mass" : "✓ Within 82-85% Norm"}
          </div>
        </div>
      </div>

      {/* Narrative status message */}
      <div
        className={`p-4 rounded-2xl border flex items-center justify-between text-xs gap-3 ${
          ledger.isBalanced
            ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-300"
            : "bg-red-950/20 border-red-500/30 text-red-300"
        }`}
      >
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0" />
          <span>{ledger.notes}</span>
        </div>
        <span className="font-mono font-bold shrink-0 text-slate-400">
          Conservation Delta: Δ {ledger.massConservationDeltaKg} kg
        </span>
      </div>
    </div>
  );
}
