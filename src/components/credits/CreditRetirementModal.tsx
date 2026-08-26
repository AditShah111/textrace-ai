"use client";

import React, { useState } from "react";
import { RecyclingCredit, RetirementRecord } from "@/types/credits";
import { Flame, ShieldCheck, CheckCircle2, Lock, AlertCircle, Sparkles, Loader2 } from "lucide-react";

interface Props {
  credit: RecyclingCredit | null;
  isOpen: boolean;
  onClose: () => void;
  onRetired: (record: RetirementRecord) => void;
}

export default function CreditRetirementModal({ credit, isOpen, onClose, onRetired }: Props) {
  const [beneficiaryBrand, setBeneficiaryBrand] = useState("Nordic EcoWear Global");
  const [productLine, setProductLine] = useState("Autumn/Winter 2026 Circular Jersey Line");
  const [orderReference, setOrderReference] = useState("PO #NW-4819-EU");
  const [complianceMandate, setComplianceMandate] = useState("EU Digital Product Passport (DPP) & CSRD Scope 3");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !credit) return null;

  const handleRetire = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/credits/retire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creditId: credit.creditId,
          retiredBy: `${beneficiaryBrand} (Sustainability Compliance)`,
          beneficiaryBrand,
          productLine,
          orderReference,
          complianceMandate,
        }),
      });
      const data = await res.json();
      if (data.success && data.retirementRecord) {
        onRetired(data.retirementRecord);
      }
    } catch (err) {
      console.error("Retirement error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Retire &amp; Burn Recycling Credits</h3>
              <p className="text-xs text-slate-400 font-mono">Credit ID: {credit.creditId}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2">✕</button>
        </div>

        {/* Credit details summary */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">Volume to Burn:</span>
            <span className="font-mono font-bold text-emerald-400 text-sm">
              {credit.creditAmountKg.toLocaleString()} TRCs ({credit.creditAmountKg.toLocaleString()} kg)
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Material Blend:</span>
            <span className="text-slate-200 font-medium">{credit.fiberComposition}</span>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Beneficiary Brand / Retailer</label>
            <input
              type="text"
              value={beneficiaryBrand}
              onChange={(e) => setBeneficiaryBrand(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Garment Collection / Product Line</label>
            <input
              type="text"
              value={productLine}
              onChange={(e) => setProductLine(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Purchase Order / SKU Ref</label>
              <input
                type="text"
                value={orderReference}
                onChange={(e) => setOrderReference(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Compliance Framework</label>
              <select
                value={complianceMandate}
                onChange={(e) => setComplianceMandate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs"
              >
                <option value="EU Digital Product Passport (DPP) & CSRD Scope 3">EU DPP &amp; CSRD Scope 3</option>
                <option value="FTC Green Guides & US Extended Producer Responsibility">FTC Green Guides (US)</option>
                <option value="ISO 14021 Self-Declared Environmental Claim">ISO 14021 Standard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Anti-double counting notice */}
        <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
          <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong>Anti-Double Counting Protocol:</strong> Once retired, these credits are permanently burned from the registry and cannot be re-allocated or transferred to any other brand.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleRetire}
            disabled={isProcessing}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-400 hover:to-red-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Burning &amp; Sealing...</span>
              </>
            ) : (
              <>
                <Flame className="w-4 h-4" />
                <span>Confirm Permanent Retirement</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
