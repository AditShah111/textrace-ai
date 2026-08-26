"use client";

import React, { useState } from "react";
import { ArrowRight, Scale, CheckCircle2, TrendingUp, AlertCircle, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function MassBalanceVisualizer() {
  const [inputWeight, setInputWeight] = useState<number>(10000);
  const [lossRate, setLossRate] = useState<number>(17.34); // %

  const transitLoss = Math.round(inputWeight * 0.008); // 0.8%
  const receivedWeight = inputWeight - transitLoss;
  const processingLoss = Math.round((receivedWeight * lossRate) / 100);
  const recycledYarnOutput = receivedWeight - processingLoss;
  const recoveryRate = ((recycledYarnOutput / receivedWeight) * 100).toFixed(2);

  return (
    <section className="py-20 bg-slate-950/60 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <Scale className="w-3.5 h-3.5" />
            <span>Conservation of Mass Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Automated Material Audit &amp; Reconciliation
          </h2>
          <p className="text-base text-slate-300">
            The core differentiator is not merely storing documents. TexTrace AI dynamically audits the mass-balance evidence, balances material inputs against process losses, and detects fictitious circularity claims.
          </p>
        </div>

        {/* Interactive Mass Balance Interactive Simulation Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls & Metrics */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border-slate-800 space-y-5">
              <h3 className="text-lg font-bold text-white flex items-center justify-between">
                <span>Input Parameters</span>
                <span className="text-xs font-mono text-emerald-400">Live Simulation</span>
              </h3>

              {/* Slider 1: Input Waste */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Waste Batch Input:</span>
                  <span className="font-mono font-bold text-emerald-400">{inputWeight.toLocaleString()} kg</span>
                </div>
                <input
                  type="range"
                  min={2000}
                  max={50000}
                  step={1000}
                  value={inputWeight}
                  onChange={(e) => setInputWeight(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>2,000 kg</span>
                  <span>25,000 kg</span>
                  <span>50,000 kg</span>
                </div>
              </div>

              {/* Slider 2: Spinning Loss */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Process Loss (Dust &amp; Noil):</span>
                  <span className="font-mono font-bold text-cyan-400">{lossRate}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={30}
                  step={0.5}
                  value={lossRate}
                  onChange={(e) => setLossRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>10% (Low)</span>
                  <span>17.34% (Standard)</span>
                  <span>30% (High)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Audit Rule: Tolerance ≤ 1.5%</span>
                </div>
                <p className="text-slate-400">
                  If claimed yarn output exceeds {receivedWeight.toLocaleString()} kg, TexTrace AI immediately raises a <strong>CRITICAL MASS-BALANCE VIOLATION</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Mass Waterfall Flow Diagram */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Step 1 */}
              <div className="glass-panel p-5 rounded-2xl border-slate-800 relative space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/20">
                  Tier 1 Scrap
                </span>
                <div className="text-xs text-slate-400">Garment Mill Invoice</div>
                <div className="text-2xl font-black text-white">{inputWeight.toLocaleString()} kg</div>
                <div className="text-[11px] text-slate-400">100% Pre-consumer waste</div>
                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                  Verified Dispatch
                </div>
              </div>

              {/* Step 2 */}
              <div className="glass-panel p-5 rounded-2xl border-slate-800 relative space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/20">
                  Transit Diff
                </span>
                <div className="text-xs text-slate-400">Weighbridge Variance</div>
                <div className="text-2xl font-black text-amber-400">-{transitLoss.toLocaleString()} kg</div>
                <div className="text-[11px] text-slate-400">0.8% Moisture loss (Normal)</div>
                <div className="pt-2 border-t border-slate-800 text-[10px] text-emerald-400">
                  Net Intake: {receivedWeight.toLocaleString()} kg
                </div>
              </div>

              {/* Step 3 */}
              <div className="glass-panel p-5 rounded-2xl border-slate-800 relative space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/20">
                  Spinning Loss
                </span>
                <div className="text-xs text-slate-400">Mechanical Garnetting</div>
                <div className="text-2xl font-black text-cyan-400">-{processingLoss.toLocaleString()} kg</div>
                <div className="text-[11px] text-slate-400">Comber noil &amp; short fibers</div>
                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                  Ledger Loss Deducted
                </div>
              </div>

              {/* Step 4 */}
              <div className="glass-panel p-5 rounded-2xl border-emerald-500/40 bg-emerald-950/30 relative space-y-3 shadow-lg shadow-emerald-500/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                  Verified Yarn
                </span>
                <div className="text-xs text-slate-300">Final Recycled Output</div>
                <div className="text-2xl font-black text-emerald-400">{recycledYarnOutput.toLocaleString()} kg</div>
                <div className="text-[11px] text-emerald-300 font-bold font-mono">
                  {recoveryRate}% Recovery Rate
                </div>
                <div className="pt-2 border-t border-emerald-500/20 text-[10px] text-emerald-300">
                  VCR TX-000184 Issued
                </div>
              </div>
            </div>

            {/* Reconciliation Formula Bar */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  <strong>Mass Conservation Equation:</strong> Input ({inputWeight.toLocaleString()} kg) = Transit ({transitLoss} kg) + Received ({receivedWeight.toLocaleString()} kg) = Loss ({processingLoss} kg) + Output ({recycledYarnOutput.toLocaleString()} kg).
                </span>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-semibold shrink-0">
                Δ 0.00 kg (Perfect Balance)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
