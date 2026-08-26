"use client";

import React, { useState } from "react";
import { Calculator, DollarSign, Leaf, Clock, ShieldCheck } from "lucide-react";

export default function RoiCalculator() {
  const [annualTons, setAnnualTons] = useState<number>(500); // tons
  const [batchesCount, setBatchesCount] = useState<number>(120);

  // Calculations
  const co2AvoidedKg = Math.round(annualTons * 1000 * 2.132);
  const waterSavedMillionL = Number(((annualTons * 1000 * 198) / 1000000).toFixed(1));
  const manualAuditHoursSaved = Math.round(batchesCount * 6.5); // 6.5 hrs saved per batch
  const penaltyRiskAvoidanceUSD = Math.round(annualTons * 180); // $180 / ton non-compliance risk

  return (
    <section className="py-24 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            <span>Circularity ROI &amp; Risk Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Calculate Your Compliance &amp; ESG Impact
          </h2>
          <p className="text-base text-slate-300">
            See how continuous automated material verification scales sustainability reporting while slashing manual audit overhead.
          </p>
        </div>

        <div className="max-w-5xl mx-auto glass-panel p-8 sm:p-10 rounded-3xl border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Sliders */}
          <div className="md:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300 font-medium">Annual Recycled Textile Volume:</span>
                <span className="font-mono font-bold text-emerald-400">{annualTons.toLocaleString()} Metric Tons</span>
              </div>
              <input
                type="range"
                min={50}
                max={5000}
                step={50}
                value={annualTons}
                onChange={(e) => setAnnualTons(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>50 MT</span>
                <span>2,500 MT</span>
                <span>5,000 MT</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300 font-medium">Annual Supply Chain Batches / Invoices:</span>
                <span className="font-mono font-bold text-cyan-400">{batchesCount} Batches</span>
              </div>
              <input
                type="range"
                min={20}
                max={1000}
                step={10}
                value={batchesCount}
                onChange={(e) => setBatchesCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>20</span>
                <span>500</span>
                <span>1,000</span>
              </div>
            </div>
          </div>

          {/* Metric Outputs */}
          <div className="md:col-span-6 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <Leaf className="w-3.5 h-3.5" />
                CO₂ Emissions Avoided
              </div>
              <div className="text-2xl font-black text-white">{(co2AvoidedKg / 1000).toFixed(0)} Tons</div>
              <div className="text-[10px] text-slate-400">vs virgin cotton production</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-medium">
                <Leaf className="w-3.5 h-3.5" />
                Water Preserved
              </div>
              <div className="text-2xl font-black text-cyan-400">{waterSavedMillionL}M Liters</div>
              <div className="text-[10px] text-slate-400">Freshwater savings</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
                <Clock className="w-3.5 h-3.5" />
                Audit Labor Saved
              </div>
              <div className="text-2xl font-black text-amber-400">{manualAuditHoursSaved.toLocaleString()} Hrs</div>
              <div className="text-[10px] text-slate-400">Automated AI document parsing</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Penalty Risk Shield
              </div>
              <div className="text-2xl font-black text-emerald-400">${(penaltyRiskAvoidanceUSD / 1000).toFixed(0)}k</div>
              <div className="text-[10px] text-slate-400">EU Green Claims protection</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
