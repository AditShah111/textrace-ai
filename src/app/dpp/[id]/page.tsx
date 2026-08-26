"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { CLEAN_VCR_RECORD } from "@/lib/sample-data";
import {
  ShieldCheck,
  QrCode,
  CheckCircle2,
  Share2,
  Printer,
  Factory,
  Truck,
  Cpu,
  Layers,
  Shirt,
  Leaf,
  Droplet,
  Zap,
  Lock,
  Download,
  ArrowLeft,
  ExternalLink,
  FileText
} from "lucide-react";

export default function DigitalProductPassportPage() {
  const params = useParams();
  const vcrId = (params?.id as string) || "TX-000184";
  const [copied, setCopied] = useState(false);

  const record = CLEAN_VCR_RECORD;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const stageIcons = [Factory, Truck, Cpu, Layers, Shirt];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 print:p-0 print:m-0">
      {/* Top Back & Action Bar (Hidden when printing) */}
      <div className="flex items-center justify-between print:hidden">
        <Link
          href="/audit"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to AI Audit Engine</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="px-3.5 py-2 rounded-xl glass-panel hover:bg-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? "Link Copied!" : "Share Passport"}</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Main Passport Authenticity Card */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border-emerald-500/30 bg-gradient-to-b from-slate-900/90 via-slate-950/80 to-slate-950 space-y-8 shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Passport Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-500/30 font-bold">
                Digital Product Passport (EU DPP v1.4)
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Issued: {new Date(record.issueTimestamp).toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Verified Circularity Record
            </h1>
            <p className="text-sm font-mono text-emerald-400 font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>VCR: {vcrId} • {record.batchId}</span>
            </p>
          </div>

          {/* QR Code Stamp */}
          <div className="p-3 bg-white rounded-2xl shadow-xl self-start sm:self-auto shrink-0">
            <QRCodeSVG value={typeof window !== "undefined" ? window.location.href : `https://textrace.ai/dpp/${vcrId}`} size={96} level="H" />
          </div>
        </div>

        {/* Core Material Specification Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Waste Diverted</span>
            <div className="text-xl sm:text-2xl font-black text-white">{record.wasteDivertedKg.toLocaleString()} kg</div>
            <span className="text-[11px] text-slate-400">Post-industrial scrap</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Verified Recycled Output</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400">{record.verifiedRecycledOutputKg.toLocaleString()} kg</div>
            <span className="text-[11px] text-emerald-300 font-semibold">82.66% Recovery Rate</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Recycled Content</span>
            <div className="text-xl sm:text-2xl font-black text-cyan-400">{record.recycledContentPercentage}%</div>
            <span className="text-[11px] text-slate-400">78.4% Cotton / 21.6% PET</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
            <span className="text-[10px] text-emerald-300 uppercase font-mono font-bold">AI Audit Status</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400">100% PASS</div>
            <span className="text-[11px] text-emerald-300">Risk Score: Low</span>
          </div>
        </div>

        {/* 5-Stage Verified Chain of Custody Timeline */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Verified 5-Stage Chain of Custody</span>
            </h3>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero Custody Gaps</span>
            </span>
          </div>

          <div className="space-y-3">
            {record.nodes.map((node, index) => {
              const IconComp = stageIcons[index] || Factory;
              return (
                <div
                  key={node.id}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:border-slate-700"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          Stage {node.stage}: {node.name}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/20">
                          Verified
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium">{node.entity}</p>
                      <p className="text-[11px] text-slate-400">{node.action} • {node.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 text-xs font-mono shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                    <div className="text-right">
                      <span className="text-slate-400 text-[10px] block">Mass Throughput:</span>
                      <span className="font-bold text-white">{node.outputKg.toLocaleString()} kg</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 text-[10px] block">Timestamp:</span>
                      <span className="text-slate-300">{node.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Environmental Impact Savings Cards */}
        <div className="space-y-4 pt-4">
          <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>Audited Environmental Footprint Savings</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <Leaf className="w-4 h-4" />
                <span>CO₂ Emissions Prevented</span>
              </div>
              <div className="text-2xl font-black text-white">{record.esgImpact.co2AvoidedKg.toLocaleString()} kg</div>
              <p className="text-[10px] text-slate-400">Calculated via ISO 14044 LCA metrics</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-medium">
                <Droplet className="w-4 h-4" />
                <span>Freshwater Preserved</span>
              </div>
              <div className="text-2xl font-black text-cyan-400">{record.esgImpact.waterSavedLiters.toLocaleString()} L</div>
              <p className="text-[10px] text-slate-400">Equivalent to 7,920 residential bath cycles</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
                <Zap className="w-4 h-4" />
                <span>Energy Conserved</span>
              </div>
              <div className="text-2xl font-black text-amber-400">{record.esgImpact.energySavedKwh.toLocaleString()} kWh</div>
              <p className="text-[10px] text-slate-400">Mechanical vs virgin synthesis</p>
            </div>
          </div>
        </div>

        {/* Cryptographic Authenticity Stamp Footer */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-300 font-mono">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verification Hash:</span>
              <span className="text-slate-400 truncate max-w-xs">{record.verificationHash}</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Signer: {record.issuerSignature} • Algorithm: RSA-4096 / SHA-256
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Official Verified Circularity Record</span>
          </div>
        </div>
      </div>
    </div>
  );
}
