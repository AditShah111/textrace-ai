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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-700 font-bold mb-1">
            <Coins className="w-4 h-4 text-amber-600" />
            <span>ENTERPRISE CIRCULARITY CREDITS • VERIFIABLE MATERIAL REGISTRY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Textile Recycling Credit (TRC) Registry
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Issuing, trading, and burning verifiable digital material credits backed by AI-audited lab specs &amp; mass-balance conservation. 
            <strong className="text-slate-900"> 1 TRC = 1 kg of verified recycled textile fiber.</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleMintSampleBatch}
            disabled={isMintingLive}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
          >
            {isMintingLive ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Minting Cryptographic TRCs...</span>
              </>
            ) : (
              <>
                <Coins className="w-4 h-4 text-amber-400" />
                <span>Mint TRCs from Audited Batch</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mechanism Visualizer */}
      <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900">Continuous Verification &amp; Credit Issuance Protocol</h3>
          </div>
          <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-bold">
            Zero Double-Counting Architecture
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs">
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[10px] font-mono uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold">
              1. AI Document Ingestion
            </span>
            <h4 className="font-bold text-slate-900 text-sm">Lab &amp; Spec Extraction</h4>
            <p className="text-slate-600 leading-relaxed">
              AI parses raw mill invoices (10,000 kg), weighbridge slips (9,920 kg net), and SGS fiber composition reports (78.4% cotton).
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[10px] font-mono uppercase text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded font-bold">
              2. Conservation of Mass
            </span>
            <h4 className="font-bold text-slate-900 text-sm">Tolerance Reconciliation</h4>
            <p className="text-slate-600 leading-relaxed">
              Engine subtracts spinning loss (-1,720 kg) and validates exact 82.66% recovery rate with zero tolerance for phantom mass.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[10px] font-mono uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-bold">
              3. Token Minting
            </span>
            <h4 className="font-bold text-slate-900 text-sm">Cryptographic TRC Mint</h4>
            <p className="text-slate-600 leading-relaxed">
              Mints dynamic TRCs with immutable serial numbers and SHA-256 batch hash into recycler wallet.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[10px] font-mono uppercase text-purple-800 bg-purple-100 px-2 py-0.5 rounded font-bold">
              4. B2B Allocation
            </span>
            <h4 className="font-bold text-slate-900 text-sm">Brand Custody Transfer</h4>
            <p className="text-slate-600 leading-relaxed">
              Recycler transfers verified TRCs to garment brand (Nordic EcoWear) to back circularity claims on garment hangtags.
            </p>
          </div>

          {/* Step 5 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[10px] font-mono uppercase text-red-800 bg-red-100 px-2 py-0.5 rounded font-bold">
              5. Final Burn &amp; Retire
            </span>
            <h4 className="font-bold text-slate-900 text-sm">DPP &amp; ESG Substantiation</h4>
            <p className="text-slate-600 leading-relaxed">
              Brand permanently burns TRCs against specific PO to generate immutable Certificate of Circularity Retirement.
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 font-bold uppercase">Total Minted</span>
            <Coins className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{totalMinted.toLocaleString()} <span className="text-xs font-mono text-slate-400">TRC</span></div>
          <p className="text-[11px] text-slate-500">Total verified recycled fiber volume</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 font-bold uppercase">Active in Wallets</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700">{totalActive.toLocaleString()} <span className="text-xs font-mono text-slate-400">TRC</span></div>
          <p className="text-[11px] text-slate-500">Available for trade or retirement</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 font-bold uppercase">Allocated to Brands</span>
            <Layers className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-700">{totalAllocated.toLocaleString()} <span className="text-xs font-mono text-slate-400">TRC</span></div>
          <p className="text-[11px] text-slate-500">Committed to active garment production</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 font-bold uppercase">Retired / Burned</span>
            <Flame className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-red-700">{totalRetired.toLocaleString()} <span className="text-xs font-mono text-slate-400">TRC</span></div>
          <p className="text-[11px] text-slate-500">Permanently retired for compliance</p>
        </div>
      </div>

      {/* Registry Table Section */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Tokenized Credit Registry Batches</h3>
            <p className="text-xs text-slate-500">Each credit represents 1 kg of verified recycled textile fiber with cryptographic mass-balance proof.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search credits, batch, brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600 w-56 font-mono"
              />
            </div>

            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-medium">
              {["ALL", "ACTIVE", "ALLOCATED", "RETIRED"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    statusFilter === status
                      ? "bg-white text-slate-900 shadow-2xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-mono text-[11px]">
                <th className="pb-3 font-semibold">TOKEN ID &amp; SERIAL</th>
                <th className="pb-3 font-semibold">BATCH / VCR REF</th>
                <th className="pb-3 font-semibold">MATERIAL &amp; COMPOSITION</th>
                <th className="pb-3 font-semibold">QUANTITY (KG)</th>
                <th className="pb-3 font-semibold">CURRENT CUSTODIAN</th>
                <th className="pb-3 font-semibold">STATUS</th>
                <th className="pb-3 text-right font-semibold">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCredits.map((credit) => (
                <tr key={credit.creditId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 font-mono font-bold text-slate-900">
                    <div>{credit.creditId}</div>
                    <span className="text-[10px] text-slate-400 font-normal">{credit.serialNumberRange}</span>
                  </td>
                  <td className="py-4 font-mono text-slate-600">
                    <div>{credit.batchId}</div>
                    <Link href={`/dpp/${credit.vcrId}`} className="text-[10px] text-emerald-700 hover:underline flex items-center gap-1 font-bold">
                      <span>{credit.vcrId}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </Link>
                  </td>
                  <td className="py-4">
                    <div className="font-semibold text-slate-900">{credit.materialType}</div>
                    <span className="text-[10px] font-mono text-slate-500">{credit.fiberComposition}</span>
                  </td>
                  <td className="py-4 font-mono font-bold text-amber-700 text-sm">
                    {credit.creditAmountKg.toLocaleString()} TRC
                  </td>
                  <td className="py-4 font-medium text-slate-800">{credit.currentOwner}</td>
                  <td className="py-4 font-mono">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      credit.status === "ACTIVE"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : credit.status === "ALLOCATED"
                        ? "bg-cyan-50 text-cyan-800 border-cyan-200"
                        : "bg-red-50 text-red-800 border-red-200"
                    }`}>
                      {credit.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    {credit.status === "ACTIVE" || credit.status === "ALLOCATED" ? (
                      <button
                        onClick={() => setSelectedCreditForRetirement(credit)}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-400 text-slate-950 font-bold text-[11px] inline-flex items-center gap-1 shadow-2xs hover:scale-105 transition-all"
                      >
                        <Flame className="w-3.5 h-3.5" />
                        <span>Retire &amp; Burn</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setViewingCertificate(credit.retirementRecord || null)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] inline-flex items-center gap-1 border border-slate-200"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-600" />
                        <span>Certificate</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Retirement Flow Modal */}
      <CreditRetirementModal
        credit={selectedCreditForRetirement}
        isOpen={!!selectedCreditForRetirement}
        onClose={() => setSelectedCreditForRetirement(null)}
        onRetired={handleRetiredSuccess}
      />

      {/* Certificate Viewer Modal */}
      <CertificateOfRetirementModal
        record={viewingCertificate}
        credit={credits.find((c) => c.retirementRecord?.certificateId === viewingCertificate?.certificateId)}
        isOpen={!!viewingCertificate}
        onClose={() => setViewingCertificate(null)}
      />
    </div>
  );
}
