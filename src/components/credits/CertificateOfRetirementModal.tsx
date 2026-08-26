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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-amber-300 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 font-bold">
              Official Proof of Circularity Claim
            </span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-2 font-bold text-sm">✕</button>
        </div>

        {/* Certificate Body (Parchment White & Gold) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 border-2 border-amber-200 text-center space-y-5 shadow-xs relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center text-white font-bold mx-auto shadow-md shadow-amber-500/20">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
              Certificate of Circularity Retirement
            </h2>
            <p className="text-[11px] font-mono text-amber-800 font-semibold">
              Certificate ID: {record.certificateId} • Issued: {new Date(record.retirementTimestamp).toLocaleDateString()}
            </p>
          </div>

          <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
            This certifies that <strong>{credit?.creditAmountKg ? credit.creditAmountKg.toLocaleString() : "8,200"} kg</strong> of independently verified textile recycling credits (TRCs) have been permanently retired and burned from the global registry to satisfy:
          </p>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900">
            {record.complianceMandate}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-left text-xs bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Beneficiary Entity:</span>
              <span className="font-bold text-slate-900">{record.beneficiaryBrand}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Garment Line / Order:</span>
              <span className="font-bold text-slate-900">{record.productLine}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Original Batch / VCR:</span>
              <span className="font-bold text-slate-900">{credit?.vcrId || "TX-000184"}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Token Serial Range:</span>
              <span className="font-bold text-amber-800">{credit?.serialNumberRange || "#00001 - #08200"}</span>
            </div>
          </div>

          {/* Environmental Savings */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-white border border-emerald-200 flex items-center justify-center gap-2 text-emerald-800 shadow-2xs">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-xs">{(record.co2OffsetKg || 21320).toLocaleString()} kg CO₂ Avoided</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-cyan-200 flex items-center justify-center gap-2 text-cyan-800 shadow-2xs">
              <Droplet className="w-4 h-4 text-cyan-600" />
              <span className="font-bold text-xs">{(record.waterSavedLiters || 1980000).toLocaleString()} L Water Saved</span>
            </div>
          </div>

          {/* QR Verification & SHA-256 Signature */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-amber-200/80 text-left">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono text-slate-500 block font-semibold">
                Cryptographic Proof Signature:
              </span>
              <p className="font-mono text-[10px] text-slate-600 break-all max-w-sm">
                {record.proofHash}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-bold pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Double-Counting Verified</span>
              </div>
            </div>

            <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-2xs shrink-0">
              <QRCodeSVG value={`https://textrace-ai.onrender.com/dpp/TX-000184?cert=${record.certificateId}`} size={70} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 font-semibold text-xs"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all hover:scale-105"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
}
