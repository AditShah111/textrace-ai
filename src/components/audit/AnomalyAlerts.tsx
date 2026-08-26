"use client";

import React from "react";
import { AuditAnomaly } from "@/types";
import { AlertOctagon, AlertTriangle, Info, CheckCircle2, ShieldAlert } from "lucide-react";

interface Props {
  anomalies: AuditAnomaly[];
}

export default function AnomalyAlerts({ anomalies }: Props) {
  if (anomalies.length === 0) {
    return (
      <div className="glass-panel p-6 rounded-3xl border-emerald-500/30 bg-emerald-950/20 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-bold text-emerald-300">Zero Audit Anomalies Detected</h4>
          <p className="text-xs text-slate-300">
            All mass-balance conservation formulas, fiber blend tolerances (AATCC 20A), and RCS/GRS scope certificates passed continuous verification with 100% precision.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-400" />
          <span>Forensic Audit Anomalies &amp; Discrepancy Breakdown ({anomalies.length})</span>
        </h3>
        <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-mono font-bold">
          High-Risk Alert
        </span>
      </div>

      <div className="space-y-3">
        {anomalies.map((anom) => {
          const isCritical = anom.severity === "CRITICAL";
          const isHigh = anom.severity === "HIGH";

          return (
            <div
              key={anom.id}
              className={`p-5 rounded-2xl border space-y-3 ${
                isCritical
                  ? "bg-red-950/40 border-red-500/50 text-red-100"
                  : isHigh
                  ? "bg-amber-950/30 border-amber-500/40 text-amber-100"
                  : "bg-slate-900/60 border-slate-800 text-slate-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {isCritical ? (
                    <AlertOctagon className="w-5 h-5 text-red-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                  )}
                  <h4 className="text-sm font-bold text-white">{anom.title}</h4>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/40 text-slate-300">
                    {anom.code}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold self-start sm:self-auto ${
                    isCritical
                      ? "bg-red-500/20 text-red-300 border border-red-500/30"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}
                >
                  {anom.severity} PRIORITY
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{anom.description}</p>

              {/* Evidence details comparison box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px]">Expected / Physical Tolerance:</span>
                  <span className="text-slate-200 font-medium">{anom.evidenceDetail.expected}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Declared in Uploaded Document:</span>
                  <span className="text-red-400 font-bold">{anom.evidenceDetail.actual}</span>
                  {anom.evidenceDetail.delta && (
                    <span className="block text-[11px] text-amber-400 font-semibold">{anom.evidenceDetail.delta}</span>
                  )}
                </div>
              </div>

              {/* Recommendation */}
              <div className="pt-2 flex items-start gap-2 text-xs text-slate-300">
                <strong className="text-emerald-400 shrink-0 font-semibold">Auditor Action:</strong>
                <span>{anom.recommendation}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
