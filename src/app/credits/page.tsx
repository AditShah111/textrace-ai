"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Coins,
  ShieldCheck,
  Flame,
  PlusCircle,
  FileCheck,
  Search,
  ExternalLink,
  Award,
  Layers,
  ArrowRight,
  Lock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Cpu,
  RefreshCw
} from "lucide-react";
import confetti from "canvas-confetti";
import { RECYCLING_CREDITS, LEDGER_TRANSACTIONS } from "@/lib/credit-registry";
import { RecyclingCredit, CreditLedgerTransaction, RetirementRecord } from "@/types/credits";
import CreditRetirementModal from "@/components/credits/CreditRetirementModal";
import CertificateOfRetirementModal from "@/components/credits/CertificateOfRetirementModal";

export default function RecyclingCreditsRegistryPage() {
  const [credits, setCredits] = useState<RecyclingCredit[]>(RECYCLING_CREDITS);
  const [transactions, setTransactions] = useState<CreditLedgerTransaction[]>(LEDGER_TRANSACTIONS);
  const [selectedCreditForRetirement, setSelectedCreditForRetirement] = useState<RecyclingCredit | null>(null);
  const [viewingCertificate, setViewingCertificate] = useState<RetirementRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isMintingLive, setIsMintingLive] = useState(false);

  const totalMinted = credits.reduce((sum, c) => sum + c.creditAmountKg, 0);
  const totalActive = credits.filter((c) => c.status === "ACTIVE").reduce((sum, c) => sum + c.creditAmountKg, 0);
  const totalAllocated = credits.filter((c) => c.status === "ALLOCATED").reduce((sum, c) => sum + c.creditAmountKg, 0);
  const totalRetired = credits.filter((c) => c.status === "RETIRED").reduce((sum, c) => sum + c.creditAmountKg, 0);

  const filteredCredits = credits.filter((c) => {
    const matchesSearch =
      c.creditId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.currentOwner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.materialType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleMintSampleBatch = async () => {
    setIsMintingLive(true);
    try {
      const res = await fetch("/api/credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          batchId: "BATCH-2026-IND-" + Math.floor(8900 + Math.random() * 100),
          vcrId: "TX-000" + Math.floor(185 + Math.random() * 50),
          materialType: "Combed Pre-Consumer Organic Cotton Clip",
          fiberComposition: "85% Cotton / 15% PET",
          verifiedYieldKg: 6500,
          issuerEntity: "Sri Lakshmi Garment Mills Ltd, Tirupur",
          sourceMill: "Tirupur Spinning Unit 2",
        }),
      });
      const data = await res.json();
      if (data.success && data.credit) {
        setCredits([data.credit, ...credits]);
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#f59e0b", "#10b981", "#06b6d4"],
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsMintingLive(false);
    }
  };

  const handleRetiredSuccess = (record: RetirementRecord) => {
    if (selectedCreditForRetirement) {
      const updated = credits.map((c) =>
        c.creditId === selectedCreditForRetirement.creditId
          ? { ...c, status: "RETIRED" as const, retirementRecord: record }
          : c
      );
      setCredits(updated);
      setSelectedCreditForRetirement(null);
      setViewingCertificate(record);

      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#f59e0b", "#ef4444", "#10b981"],
      });
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
            <Coins className="w-4 h-4" />
            <span>ENTERPRISE CIRCULARITY CREDITS • VERIFIABLE MATERIAL REGISTRY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Textile Recycling Credit (TRC) Registry
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Issuing, trading, and burning verifiable digital material credits backed by AI-audited lab specs &amp; mass-balance conservation. 
            <strong className="text-slate-200"> 1 TRC = 1 kg of verified recycled textile fiber.</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleMintSampleBatch}
            disabled={isMintingLive}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-500 hover:from-amber-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
          >
            {isMintingLive ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Minting Cryptographic TRCs...</span>
              </>
            ) : (
              <>
                <Coins className="w-4 h-4" />
                <span>Mint TRCs from Audited Batch</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mechanism Visualizer: Verification -> Credit Issuance & Burn */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Continuous Verification &amp; Credit Issuance Protocol</h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-500/20">
            Zero Double-Counting Architecture
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs">
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono uppercase text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">
              1. AI Document Ingestion
            </span>
            <h4 className="font-bold text-white text-sm">Lab &amp; Spec Extraction</h4>
            <p className="text-slate-400 leading-relaxed">
              AI parses raw mill invoices (10,000 kg), weighbridge slips (9,920 kg net), and SGS fiber composition reports (78.4% cotton).
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono uppercase text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded">
              2. Conservation of Mass Audit
            </span>
            <h4 className="font-bold text-white text-sm">Tolerance Reconciliation</h4>
            <p className="text-slate-400 leading-relaxed">
              Engine subtracts spinning loss (-1,720 kg) and validates exact 82.66% recovery rate with zero tolerance for phantom mass.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono uppercase text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded">
              3. Token Minting
            </span>
            <h4 className="font-bold text-white text-sm">Cryptographic TRC Mint</h4>
            <p className="text-slate-400 leading-relaxed">
              Mints 8,200 TRCs with immutable serial numbers (<code>#00001 - #08200</code>) and SHA-256 batch hash into recycler wallet.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono uppercase text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded">
              4. B2B Allocation &amp; Custody
            </span>
            <h4 className="font-bold text-white text-sm">Brand Ownership Transfer</h4>
            <p className="text-slate-400 leading-relaxed">
              Recycler transfers verified TRCs to garment brand (Nordic EcoWear) to back their sustainability claims on garment hangtags.
            </p>
          </div>

          {/* Step 5 */}
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-2">
            <span className="text-[10px] font-mono uppercase text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded font-bold">
              5. Permanent Retirement &amp; Burn
            </span>
            <h4 className="font-bold text-amber-300 text-sm">Retirement Certificate</h4>
            <p className="text-slate-300 leading-relaxed">
              Credits are permanently burned for EU DPP compliance. Emits public Certificate of Retirement that can never be reused.
            </p>
          </div>
        </div>
      </div>

      {/* Credit Balances Registry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Total Minted TRCs</span>
            <Coins className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{totalMinted.toLocaleString()} TRCs</div>
          <div className="text-[11px] text-slate-400 font-mono">1 TRC = 1 kg verified scrap</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Available / Active</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">{totalActive.toLocaleString()} TRCs</div>
          <div className="text-[11px] text-emerald-300 font-medium">Ready for brand allocation</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Allocated to Brands</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400">{totalAllocated.toLocaleString()} TRCs</div>
          <div className="text-[11px] text-slate-400">Held in brand enterprise wallets</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-amber-500/30 bg-amber-950/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-amber-400">
            <span className="font-semibold uppercase tracking-wider font-bold">Permanently Burned</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-300">{totalRetired.toLocaleString()} TRCs</div>
          <div className="text-[11px] text-amber-400 font-medium">Official EU DPP Proof of Offset</div>
        </div>
      </div>

      {/* Verifiable Credit Tokens Registry Table */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white">Verifiable Recycling Credits (TRC Master Ledger)</h3>
            <p className="text-xs text-slate-400">Searchable registry of tokenized recycling credits with cryptographic proof hashes</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Credit ID, Batch, Owner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 w-64"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active (Available)</option>
              <option value="ALLOCATED">Allocated</option>
              <option value="RETIRED">Retired / Burned</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                <th className="py-3 px-3">Credit Token ID</th>
                <th className="py-3 px-3">Serial Range</th>
                <th className="py-3 px-3">Material &amp; Blend</th>
                <th className="py-3 px-3">Volume (kg)</th>
                <th className="py-3 px-3">Current Custody</th>
                <th className="py-3 px-3">Registry Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredCredits.map((credit) => {
                const isActive = credit.status === "ACTIVE";
                const isAllocated = credit.status === "ALLOCATED";
                const isRetired = credit.status === "RETIRED";

                return (
                  <tr key={credit.creditId} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-3 space-y-0.5">
                      <span className="font-mono font-bold text-amber-400 block">{credit.creditId}</span>
                      <span className="text-[10px] text-slate-400 font-mono">VCR: {credit.vcrId}</span>
                    </td>
                    <td className="py-4 px-3 font-mono font-semibold text-slate-300">
                      {credit.serialNumberRange}
                    </td>
                    <td className="py-4 px-3 space-y-0.5 max-w-xs">
                      <span className="text-slate-200 font-medium block truncate">{credit.materialType}</span>
                      <span className="text-[10px] text-slate-400 block">{credit.fiberComposition}</span>
                    </td>
                    <td className="py-4 px-3 font-mono font-bold text-white">
                      {credit.creditAmountKg.toLocaleString()} TRCs
                    </td>
                    <td className="py-4 px-3 text-slate-300 font-medium max-w-xs truncate">
                      {credit.currentOwner}
                    </td>
                    <td className="py-4 px-3">
                      {isActive && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold font-mono">
                          ACTIVE
                        </span>
                      )}
                      {isAllocated && (
                        <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold font-mono">
                          ALLOCATED
                        </span>
                      )}
                      {isRetired && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold font-mono">
                          RETIRED / BURNED
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-3 text-right">
                      {isRetired ? (
                        <button
                          onClick={() => setViewingCertificate(credit.retirementRecord || null)}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-[11px] font-semibold transition-colors"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>View Certificate</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedCreditForRetirement(credit)}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 text-[11px] font-semibold transition-colors"
                        >
                          <Flame className="w-3.5 h-3.5" />
                          <span>Retire &amp; Burn</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Blockchain-Style Cryptographic Ledger Stream */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Cryptographic Transaction Stream (Immutable Ledger)</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">SHA-256 Signed</span>
        </div>

        <div className="space-y-2">
          {transactions.map((tx) => (
            <div
              key={tx.txId}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    tx.type === "MINT"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : tx.type === "RETIRE"
                      ? "bg-amber-500/20 text-amber-300"
                      : "bg-cyan-500/20 text-cyan-300"
                  }`}
                >
                  {tx.type}
                </span>
                <span className="text-white font-bold">{tx.quantityKg.toLocaleString()} TRCs</span>
                <span className="text-slate-400 text-[11px]">({tx.creditId})</span>
              </div>

              <div className="text-slate-300 text-[11px] truncate max-w-md">
                {tx.fromParty} → <span className="text-white">{tx.toParty}</span>
              </div>

              <div className="text-slate-500 text-[10px] truncate max-w-xs text-right">
                Proof: {tx.proofHash.slice(0, 18)}...
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Retirement Form Modal */}
      <CreditRetirementModal
        credit={selectedCreditForRetirement}
        isOpen={!!selectedCreditForRetirement}
        onClose={() => setSelectedCreditForRetirement(null)}
        onRetired={handleRetiredSuccess}
      />

      {/* Official Certificate View Modal */}
      <CertificateOfRetirementModal
        record={viewingCertificate}
        credit={credits.find((c) => c.retirementRecord?.certificateId === viewingCertificate?.certificateId)}
        isOpen={!!viewingCertificate}
        onClose={() => setViewingCertificate(null)}
      />
    </div>
  );
}
