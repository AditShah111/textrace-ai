"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Coins,
  Flame,
  ArrowRight,
  RefreshCw,
  Eye,
  UploadCloud,
  Scale,
  Award,
  Lock,
  Leaf,
  Droplet,
  Printer,
  Sparkles,
  Layers,
  ChevronRight
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { CLEAN_DOCUMENTS, FRAUD_DOCUMENTS } from "@/lib/sample-data";
import { ExtractedDocumentData } from "@/types";
import { performMaterialAudit, AuditReconciliationResult } from "@/lib/audit-engine";
import DocumentExtractionViewer from "@/components/audit/DocumentExtractionViewer";
import CertificateOfRetirementModal from "@/components/credits/CertificateOfRetirementModal";
import { RetirementRecord, RecyclingCredit } from "@/types/credits";

export default function CleanMinimalApp() {
  const [activeTab, setActiveTab] = useState<"docs" | "audit" | "credits">("docs");
  const [batchType, setBatchType] = useState<"clean" | "fraud">("clean");
  const [documents, setDocuments] = useState<ExtractedDocumentData[]>(CLEAN_DOCUMENTS);
  const [auditResult, setAuditResult] = useState<AuditReconciliationResult>(
    performMaterialAudit(CLEAN_DOCUMENTS, "BATCH-2026-IND-8842", "TX-000184")
  );
  const [isAuditing, setIsAuditing] = useState(false);
  const [inspectingDoc, setInspectingDoc] = useState<ExtractedDocumentData | null>(null);

  // Credit State
  const [creditStatus, setCreditStatus] = useState<"ACTIVE" | "RETIRED">("ACTIVE");
  const [retiredRecord, setRetiredRecord] = useState<RetirementRecord | null>(null);
  const [viewingCert, setViewingCert] = useState(false);
  const [isRetiring, setIsRetiring] = useState(false);

  const handleBatchSwitch = (type: "clean" | "fraud") => {
    setBatchType(type);
    if (type === "clean") {
      setDocuments(CLEAN_DOCUMENTS);
      setAuditResult(performMaterialAudit(CLEAN_DOCUMENTS, "BATCH-2026-IND-8842", "TX-000184"));
      setCreditStatus("ACTIVE");
      setRetiredRecord(null);
    } else {
      setDocuments(FRAUD_DOCUMENTS);
      setAuditResult(performMaterialAudit(FRAUD_DOCUMENTS, "BATCH-2026-MANIP-990", "TX-000990"));
    }
  };

  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setActiveTab("audit");
      if (batchType === "clean") {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      }
    }, 500);
  };

  const handleRetire = () => {
    setIsRetiring(true);
    setTimeout(() => {
      const rec: RetirementRecord = {
        certificateId: "CERT-RET-2026-9912",
        retiredBy: "Nordic EcoWear Global",
        beneficiaryBrand: "Nordic EcoWear Global",
        productLine: "Autumn/Winter Circular Jersey Line",
        orderReference: "PO #NW-4819-EU",
        retirementTimestamp: new Date().toISOString(),
        complianceMandate: "EU Digital Product Passport (DPP) & CSRD Scope 3",
        proofHash: "0x8f2a9e33b5c7714902d8471c99fa68a35e2194b17c938d2f09d841e21b8c1992",
        verificationUrl: "/dpp/TX-000184",
        co2OffsetKg: 21320,
        waterSavedLiters: 1980000,
      };
      setRetiredRecord(rec);
      setCreditStatus("RETIRED");
      setIsRetiring(false);
      setViewingCert(true);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 }, colors: ["#f59e0b", "#10b981"] });
    }, 600);
  };

  const isVerified = auditResult.status === "VERIFIED";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Clean Segmented Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-2 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl backdrop-blur-xl">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("docs")}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "docs"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>1. Documents ({documents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("audit")}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "audit"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-cyan-400" />
            <span>2. Material Audit</span>
            {isVerified ? (
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            ) : (
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("credits")}
            disabled={!isVerified}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "credits"
                ? "bg-slate-800 text-white shadow-sm"
                : isVerified
                ? "text-slate-400 hover:text-slate-200"
                : "opacity-40 cursor-not-allowed text-slate-600"
            }`}
          >
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>3. Circularity Credits</span>
          </button>
        </div>

        {/* 1-Click Scenario Preset Toggle */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs w-full sm:w-auto justify-center">
          <button
            onClick={() => handleBatchSwitch("clean")}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              batchType === "clean"
                ? "bg-emerald-500 text-slate-950 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Authentic Batch
          </button>
          <button
            onClick={() => handleBatchSwitch("fraud")}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              batchType === "fraud"
                ? "bg-red-500 text-white font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Fraudulent Batch
          </button>
        </div>
      </div>

      {/* Main Clean Card View */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
        {/* ========================================================================= */}
        {/* TAB 1: DOCUMENTS */}
        {/* ========================================================================= */}
        {activeTab === "docs" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Inbound Evidence Package</h3>
                <p className="text-xs text-slate-400">Lab reports, weighbridge terminal slips &amp; recycling scope certificates.</p>
              </div>
              <button
                onClick={handleRunAudit}
                disabled={isAuditing}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
              >
                {isAuditing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Scale className="w-3.5 h-3.5" />}
                <span>Run AI Audit &rarr;</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setInspectingDoc(doc)}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">{doc.fileName}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">{doc.quantityKg.toLocaleString()} kg • {doc.composition.cottonPercentage}% Cotton</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 group-hover:text-emerald-400">Inspect &rarr;</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: MATERIAL AUDIT */}
        {/* ========================================================================= */}
        {activeTab === "audit" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Conservation of Mass Audit</h3>
                <p className="text-xs text-slate-400">Verifying material movement from scrap generation to recycled yarn output.</p>
              </div>

              {isVerified ? (
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> 100% RECONCILED
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> ANOMALY DETECTED
                </span>
              )}
            </div>

            {/* Mass Flow Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">1. Inbound Scrap</span>
                <div className="text-lg font-bold text-white">{auditResult.ledger.wasteGeneratedKg.toLocaleString()} kg</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-amber-400 uppercase">2. Transit Variance</span>
                <div className="text-lg font-bold text-amber-400">-{auditResult.ledger.transportLossKg} kg</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">3. Spinning Loss</span>
                <div className="text-lg font-bold text-slate-400">-{auditResult.ledger.processingLossKg.toLocaleString()} kg</div>
              </div>
              <div className={`p-3.5 rounded-2xl border space-y-1 ${
                isVerified ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-400" : "bg-red-950/30 border-red-500/30 text-red-400"
              }`}>
                <span className="text-[10px] font-mono uppercase font-bold">4. Recycled Output</span>
                <div className="text-lg font-bold">{auditResult.ledger.recycledYarnProducedKg.toLocaleString()} kg</div>
              </div>
            </div>

            {/* If fraud */}
            {auditResult.anomalies.length > 0 && (
              <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/30 text-xs space-y-2">
                <div className="font-bold text-red-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Physical Mass Violation Detected</span>
                </div>
                <p className="text-slate-300">
                  Claimed output ({auditResult.ledger.recycledYarnProducedKg.toLocaleString()} kg) exceeds verified net input ({auditResult.ledger.recyclerReceivedKg.toLocaleString()} kg). Zero credits issued.
                </p>
              </div>
            )}

            {isVerified && (
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-mono text-emerald-400">Recovery Rate: {auditResult.ledger.recoveryRatePercent}%</span>
                <button
                  onClick={() => setActiveTab("credits")}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>Issue 8,200 Circularity Credits &rarr;</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: CIRCULARITY CREDITS */}
        {/* ========================================================================= */}
        {activeTab === "credits" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Textile Recycling Credits (TRCs)</h3>
                <p className="text-xs text-slate-400">1 TRC = 1 kg verified recycled fiber. Brands retire credits to prove compliance.</p>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                creditStatus === "RETIRED"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
              }`}>
                {creditStatus === "RETIRED" ? "🔥 BURNED & RETIRED" : "🪙 ACTIVE IN WALLET"}
              </span>
            </div>

            {/* Credit Overview */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Verified Balance</span>
                <div className="text-3xl font-black text-amber-400">8,200 TRCs</div>
                <p className="text-xs text-slate-400">Allocated to <strong>Nordic EcoWear Global</strong></p>
              </div>

              {creditStatus === "ACTIVE" ? (
                <button
                  onClick={handleRetire}
                  disabled={isRetiring}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
                >
                  <Flame className="w-4 h-4" />
                  <span>{isRetiring ? "Retiring..." : "Retire / Burn 8,200 TRCs for Compliance"}</span>
                </button>
              ) : (
                <button
                  onClick={() => setViewingCert(true)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>View Proof Certificate</span>
                </button>
              )}
            </div>

            {creditStatus === "RETIRED" && (
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300 flex items-center justify-between">
                <span>✓ Permanently burned to substantiate EU DPP &amp; CSRD Scope 3 compliance.</span>
                <button onClick={() => setViewingCert(true)} className="underline font-bold text-white">Certificate #CERT-RET-2026-9912</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Document Inspector Modal */}
      <DocumentExtractionViewer
        document={inspectingDoc}
        onClose={() => setInspectingDoc(null)}
      />

      {/* Certificate Modal */}
      <CertificateOfRetirementModal
        record={retiredRecord}
        credit={{
          creditId: "TRC-2026-IND-TLM-8842",
          serialNumberRange: "#00001 - #08200",
          batchId: "BATCH-2026-IND-8842",
          vcrId: "TX-000184",
          materialType: "Pre-Consumer Cotton/Poly Blend",
          fiberComposition: "78.4% Cotton / 21.6% PET",
          creditAmountKg: 8200,
          issuerEntity: "EcoSpin Reclaimers",
          sourceMill: "Sri Lakshmi Garment Mills",
          mintTimestamp: "2026-08-22",
          status: "RETIRED",
          currentOwner: "Nordic EcoWear Global",
          cryptographicSeal: {
            merkleRoot: "0x4f88129a012bc781293e",
            rsaSignature: "TexTrace-VeriEngine-RSA4096",
            sha256Hash: "0x8f2a9e33b5c7714902d8471c99fa68a35e2194b17c938d2f09d841e21b8c1992",
            auditorVerificationId: "AUDIT-PASS-TX-000184",
          },
        }}
        isOpen={viewingCert}
        onClose={() => setViewingCert(false)}
      />
    </div>
  );
}
