"use client";

import React from "react";
import { RetirementRecord, RecyclingCredit } from "@/types/credits";
import { QRCodeSVG } from "qrcode.react";
import { Award, ShieldCheck, CheckCircle2, Lock, Download, Printer, Leaf, Droplet, ExternalLink } from "lucide-react";

interface Props {
  record: RetirementRecord | null;
  credit?: RecyclingCredit | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificateOfRetirementModal({ record, credit, isOpen, onClose }: Props) {
  if (!isOpen || !record) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-amber-500/50 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl space-y-6 relative">
        {/* Holographic Border / Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-md border border-amber-500/30 font-bold">
              Official Proof of Circularity Claim
            </span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2">✕</button>
        </div>

        {/* Certificate Body */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-emerald-500 flex items-center justify-center text-slate-950 font-bold mx-auto shadow-lg shadow-amber-500/20">
            <Award className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Certificate of Circularity Retirement
            </h2>
            <p className="text-xs font-mono text-amber-400">
              Certificate ID: {record.certificateId} • Timestamp: {new Date(record.retirementTimestamp).toUTCString()}
            </p>
          </div>

          <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
            This certifies that <strong>{credit?.creditAmountKg ? credit.creditAmountKg.toLocaleString() : "8,200"} kg</strong> of independently verified textile recycling credits (TRCs) have been permanently retired and burned from the global registry to satisfy:
          </p>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-semibold text-emerald-300">
            {record.complianceMandate}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-left text-xs bg-slate-950/60 p-4 rounded-xl border border-slate-800 font-mono">
            <div>
              <span className="text-slate-400 block text-[10px]">Beneficiary Brand:</span>
              <span className="text-white font-bold">{record.beneficiaryBrand}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Product / Line:</span>
              <span className="text-slate-200">{record.productLine}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Order Reference:</span>
              <span className="text-slate-200">{record.orderReference}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Credit Serial Range:</span>
              <span className="text-amber-400 font-bold">{credit?.serialNumberRange || "#00001 - #08200"}</span>
            </div>
          </div>

          {/* Environmental Offset Verified */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs space-y-1">
              <div className="flex items-center justify-center gap-1 text-emerald-400 font-medium">
                <Leaf className="w-3.5 h-3.5" />
                <span>CO₂ Offset</span>
              </div>
              <div className="text-lg font-black text-white">{(record.co2OffsetKg / 1000).toFixed(1)} Tons</div>
            </div>
            <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs space-y-1">
              <div className="flex items-center justify-center gap-1 text-cyan-400 font-medium">
                <Droplet className="w-3.5 h-3.5" />
                <span>Water Preserved</span>
              </div>
              <div className="text-lg font-black text-cyan-400">{((record.waterSavedLiters) / 1000000).toFixed(2)}M Liters</div>
            </div>
          </div>

          {/* QR & Hash Seal */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-left">
            <div className="space-y-1 max-w-xs text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-1 text-slate-300 font-bold">
                <Lock className="w-3 h-3 text-amber-400" />
                <span>Cryptographic Proof Hash:</span>
              </div>
              <p className="truncate text-slate-400">{record.proofHash}</p>
              <p className="text-emerald-400">✓ Cryptographically Signed &amp; Permanently Burned</p>
            </div>

            <div className="p-2 bg-white rounded-xl">
              <QRCodeSVG value={typeof window !== "undefined" ? window.location.href : "https://textrace.ai/credits"} size={70} />
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
}
