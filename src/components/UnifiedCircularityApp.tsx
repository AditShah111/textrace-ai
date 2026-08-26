"use client";

import React, { useState } from "react";
import Link from "next/link";
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
import { ExtractedDocumentData, MassBalanceLedger, AuditAnomaly } from "@/types";
import { performMaterialAudit, AuditReconciliationResult } from "@/lib/audit-engine";
import DocumentExtractionViewer from "@/components/audit/DocumentExtractionViewer";
import DocumentUploaderModal from "@/components/audit/DocumentUploaderModal";
import CertificateOfRetirementModal from "@/components/credits/CertificateOfRetirementModal";
import { RetirementRecord, RecyclingCredit } from "@/types/credits";

export default function UnifiedCircularityApp() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [scenarioType, setScenarioType] = useState<"clean" | "fraud">("clean");
  const [documents, setDocuments] = useState<ExtractedDocumentData[]>(CLEAN_DOCUMENTS);
  const [auditResult, setAuditResult] = useState<AuditReconciliationResult>(
    performMaterialAudit(CLEAN_DOCUMENTS, "BATCH-2026-IND-8842", "TX-000184")
  );
  const [isAuditing, setIsAuditing] = useState(false);
  const [inspectingDoc, setInspectingDoc] = useState<ExtractedDocumentData | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Step 3 State: Credits
  const [mintedCredits, setMintedCredits] = useState<RecyclingCredit>({
    creditId: "TRC-2026-IND-TLM-8842",
    serialNumberRange: "#00001 - #08200",
    batchId: "BATCH-2026-IND-8842",
    vcrId: "TX-000184",
    materialType: "Pre-Consumer Combed Cotton/Poly Recycled Blend",
    fiberComposition: "78.4% Cotton / 21.6% PET",
    creditAmountKg: 8200,
    issuerEntity: "EcoSpin Reclaimers Pvt Ltd, Coimbatore",
    sourceMill: "Sri Lakshmi Garment Mills Ltd, Tirupur",
    mintTimestamp: "2026-08-22T18:15:00Z",
    status: "ACTIVE",
    currentOwner: "Nordic EcoWear Global",
    cryptographicSeal: {
      merkleRoot: "0x4f88129a012bc781293e",
      rsaSignature: "TexTrace-VeriEngine-RSA4096-Signed",
      sha256Hash: "0x8f2a9e33b5c7714902d8471c99fa68a35e2194b17c938d2f09d841e21b8c1992",
      auditorVerificationId: "AUDIT-PASS-TX-000184",
    },
  });

  const [retiredRecord, setRetiredRecord] = useState<RetirementRecord | null>(null);
  const [viewingCertificate, setViewingCertificate] = useState(false);
  const [burnBrand, setBurnBrand] = useState("Nordic EcoWear Global");
  const [burnProduct, setBurnProduct] = useState("Autumn/Winter Circular Jersey Line");
  const [burnPO, setBurnPO] = useState("PO #NW-4819-EU");
  const [isBurning, setIsBurning] = useState(false);

  // Switch Scenario
  const handleScenarioSwitch = (type: "clean" | "fraud") => {
    setScenarioType(type);
    if (type === "clean") {
      setDocuments(CLEAN_DOCUMENTS);
      const res = performMaterialAudit(CLEAN_DOCUMENTS, "BATCH-2026-IND-8842", "TX-000184");
      setAuditResult(res);
      setMintedCredits((prev) => ({
        ...prev,
        status: "ACTIVE",
        creditAmountKg: 8200,
        batchId: "BATCH-2026-IND-8842",
        vcrId: "TX-000184",
      }));
      setRetiredRecord(null);
    } else {
      setDocuments(FRAUD_DOCUMENTS);
      const res = performMaterialAudit(FRAUD_DOCUMENTS, "BATCH-2026-MANIP-990", "TX-000990");
      setAuditResult(res);
    }
  };

  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      const res = performMaterialAudit(documents, "BATCH-2026-LIVE-8842", "TX-000184");
      setAuditResult(res);
      setIsAuditing(false);
      setCurrentStep(2);

      if (res.status === "VERIFIED") {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#10b981", "#34d399", "#06b6d4"],
        });
      }
    }, 600);
  };

  const handleRetireCredits = () => {
    setIsBurning(true);
    setTimeout(() => {
      const rec: RetirementRecord = {
        certificateId: "CERT-RET-2026-" + Math.floor(1000 + Math.random() * 9000),
        retiredBy: `${burnBrand} (Sustainability Compliance)`,
        beneficiaryBrand: burnBrand,
        productLine: burnProduct,
        orderReference: burnPO,
        retirementTimestamp: new Date().toISOString(),
        complianceMandate: "EU Digital Product Passport (DPP) & CSRD Scope 3 Circularity",
        proofHash: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
        verificationUrl: "/dpp/TX-000184",
        co2OffsetKg: Math.round(mintedCredits.creditAmountKg * 2.132),
        waterSavedLiters: Math.round(mintedCredits.creditAmountKg * 198),
      };

      setRetiredRecord(rec);
      setMintedCredits((prev) => ({ ...prev, status: "RETIRED", retirementRecord: rec }));
      setIsBurning(false);
      setViewingCertificate(true);

      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#f59e0b", "#ef4444", "#10b981"],
      });
    }, 800);
  };

  const handleDocumentAdded = (newDoc: ExtractedDocumentData) => {
    const updated = [...documents, newDoc];
    setDocuments(updated);
    const res = performMaterialAudit(updated);
    setAuditResult(res);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* 3-Step Simple Progress Header */}
      <div className="glass-panel p-4 sm:p-6 rounded-3xl border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              3-Step Textile Circularity Workflow
            </h2>
            <p className="text-xs text-slate-400">
              Ingest lab reports &rarr; Audit material mass-balance &rarr; Issue &amp; retire textile recycling credits for brands.
            </p>
          </div>

          {/* Quick Scenario Preset Switcher */}
          <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs">
            <button
              onClick={() => handleScenarioSwitch("clean")}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
                scenarioType === "clean"
                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Clean Batch (Pass)
            </button>
            <button
              onClick={() => handleScenarioSwitch("fraud")}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
                scenarioType === "fraud"
                  ? "bg-red-500 text-white shadow-md shadow-red-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Manipulated Batch (Fail)
            </button>
          </div>
        </div>

        {/* Stepper Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => setCurrentStep(1)}
            className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
              currentStep === 1
                ? "bg-emerald-950/40 border-emerald-500/50 shadow-lg shadow-emerald-500/10"
                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
            }`}
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Step 1</span>
              <h3 className={`text-sm font-bold ${currentStep === 1 ? "text-white" : "text-slate-300"}`}>
                Evidence &amp; Lab Ingestion
              </h3>
              <p className="text-[11px] text-slate-400">{documents.length} verified documents loaded</p>
            </div>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
              currentStep === 1 ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400"
            }`}>
              1
            </div>
          </button>

          <button
            onClick={() => setCurrentStep(2)}
            className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
              currentStep === 2
                ? "bg-cyan-950/40 border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
            }`}
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">Step 2</span>
              <h3 className={`text-sm font-bold ${currentStep === 2 ? "text-white" : "text-slate-300"}`}>
                AI Material Audit
              </h3>
              <p className="text-[11px] text-slate-400">
                {auditResult.status === "VERIFIED" ? "✓ 100% Mass Reconciled" : "🚨 Discrepancy Detected"}
              </p>
            </div>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
              currentStep === 2 ? "bg-cyan-500 text-slate-950" : "bg-slate-800 text-slate-400"
            }`}>
              2
            </div>
          </button>

          <button
            onClick={() => setCurrentStep(3)}
            disabled={auditResult.status !== "VERIFIED"}
            className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
              currentStep === 3
                ? "bg-amber-950/40 border-amber-500/50 shadow-lg shadow-amber-500/10"
                : auditResult.status === "VERIFIED"
                ? "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                : "opacity-40 cursor-not-allowed bg-slate-900/30 border-slate-800"
            }`}
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">Step 3</span>
              <h3 className={`text-sm font-bold ${currentStep === 3 ? "text-white" : "text-slate-300"}`}>
                Circularity Credits (TRCs)
              </h3>
              <p className="text-[11px] text-slate-400">
                {mintedCredits.status === "RETIRED" ? "🔥 Credits Retired & Burned" : "8,200 TRCs Minted"}
              </p>
            </div>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
              currentStep === 3 ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-400"
            }`}>
              3
            </div>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP 1: Evidence & Lab Report Ingestion */}
      {/* ========================================================================= */}
      {currentStep === 1 && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <span>Step 1: Evidence Ingestion &amp; Lab Reports</span>
              </h3>
              <p className="text-xs text-slate-400">
                Ingest mill waste invoices, weighbridge terminal slips, SGS lab composition tests, and scope certificates.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsUploadOpen(true)}
                className="px-4 py-2 rounded-xl glass-panel hover:bg-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-1.5 border border-slate-700 transition-colors"
              >
                <UploadCloud className="w-4 h-4 text-emerald-400" />
                <span>Upload Custom Document</span>
              </button>
              <button
                onClick={handleRunAudit}
                disabled={isAuditing}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all hover:scale-105"
              >
                <RefreshCw className={`w-4 h-4 ${isAuditing ? "animate-spin" : ""}`} />
                <span>{isAuditing ? "Auditing Materials..." : "Run AI Material Audit →"}</span>
              </button>
            </div>
          </div>

          {/* Document Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => {
              const isFlagged = doc.certification?.status === "Expired" || doc.quantityKg > 12000;
              return (
                <div
                  key={doc.id}
                  className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 transition-all ${
                    isFlagged ? "bg-red-950/30 border-red-500/40" : "bg-slate-900/80 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">
                        {doc.documentType.replace("_", " ")}
                      </span>
                      <button
                        onClick={() => setInspectingDoc(doc)}
                        className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </div>
                    <h4 className="text-xs font-bold text-white line-clamp-1 mt-1">{doc.fileName}</h4>
                    <p className="text-[11px] text-slate-400 truncate">{doc.issuer}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px] font-mono">
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase">Declared Mass</span>
                      <span className="font-bold text-white">{doc.quantityKg.toLocaleString()} kg</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase">Blend Spec</span>
                      <span className="text-slate-300">{doc.composition.cottonPercentage}% Cotton</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleRunAudit}
              className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-transform hover:scale-105"
            >
              <span>Proceed to Step 2: AI Material Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: Automated AI Material Audit */}
      {/* ========================================================================= */}
      {currentStep === 2 && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-cyan-400" />
                <span>Step 2: Automated AI Material &amp; Mass-Balance Audit</span>
              </h3>
              <p className="text-xs text-slate-400">
                Audits mass conservation from raw waste dispatch to final yarn production with zero tolerance for phantom yield.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {auditResult.status === "VERIFIED" ? (
                <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  VERIFIED BATCH (Score: 98/100)
                </span>
              ) : (
                <span className="px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  AUDIT FAILED (Risk: Critical)
                </span>
              )}
            </div>
          </div>

          {/* Mass-Balance Reconciliation Waterfall */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Mass-Balance Reconciliation Flow
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase">1. Waste Invoiced</span>
                <div className="text-xl font-bold text-white">{auditResult.ledger.wasteGeneratedKg.toLocaleString()} kg</div>
                <span className="text-[10px] text-slate-400">Mill Tier 1 Dispatch</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-amber-400 uppercase">2. Transit Loss</span>
                <div className="text-xl font-bold text-amber-400">-{auditResult.ledger.transportLossKg} kg</div>
                <span className="text-[10px] text-slate-400">0.8% Moisture Tare</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-cyan-400 uppercase">3. Net Intake</span>
                <div className="text-xl font-bold text-white">{auditResult.ledger.recyclerReceivedKg.toLocaleString()} kg</div>
                <span className="text-[10px] text-slate-400">Weighbridge Weighed</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">4. Spinning Loss</span>
                <div className="text-xl font-bold text-slate-300">-{auditResult.ledger.processingLossKg.toLocaleString()} kg</div>
                <span className="text-[10px] text-slate-400">17.34% Comber Noil</span>
              </div>

              <div className={`p-4 rounded-2xl border space-y-1 ${
                auditResult.status === "VERIFIED" ? "bg-emerald-950/30 border-emerald-500/30" : "bg-red-950/30 border-red-500/40"
              }`}>
                <span className={`text-[10px] font-mono uppercase font-bold ${
                  auditResult.status === "VERIFIED" ? "text-emerald-300" : "text-red-400"
                }`}>
                  5. Recycled Output
                </span>
                <div className={`text-xl font-bold ${
                  auditResult.status === "VERIFIED" ? "text-emerald-400" : "text-red-400"
                }`}>
                  {auditResult.ledger.recycledYarnProducedKg.toLocaleString()} kg
                </div>
                <span className="text-[10px] font-semibold text-slate-300 font-mono">
                  {auditResult.ledger.recoveryRatePercent}% Recovery
                </span>
              </div>
            </div>
          </div>

          {/* Anomaly breakdown if failed */}
          {auditResult.anomalies.length > 0 && (
            <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/40 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-red-400 font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>Critical Anomalies Detected:</span>
              </div>
              {auditResult.anomalies.map((anom) => (
                <div key={anom.id} className="p-3 rounded-xl bg-slate-950/60 border border-red-500/20 text-slate-300 space-y-1 font-mono">
                  <div className="text-red-300 font-bold">{anom.title}</div>
                  <div className="text-slate-400">{anom.description}</div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              &larr; Back to Evidence
            </button>

            {auditResult.status === "VERIFIED" ? (
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-transform hover:scale-105"
              >
                <Coins className="w-4 h-4" />
                <span>Proceed to Step 3: Issue Circularity Credits</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => handleScenarioSwitch("clean")}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Switch to Clean Batch Demo
              </button>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: Circularity Credits & Brand Usability */}
      {/* ========================================================================= */}
      {currentStep === 3 && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-400" />
                <span>Step 3: Circularity Credit System &amp; Brand Usability</span>
              </h3>
              <p className="text-xs text-slate-400">
                1 Textile Recycling Credit (TRC) = 1 kg verified recycled fiber. Brands retire credits to substantiate EU DPP and EPR compliance.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold font-mono ${
                mintedCredits.status === "RETIRED"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
              }`}>
                {mintedCredits.status === "RETIRED" ? "🔥 PERMANENTLY RETIRED" : "🪙 ACTIVE IN WALLET"}
              </span>
            </div>
          </div>

          {/* Credit Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400">Minted Volume</span>
              <div className="text-2xl font-black text-amber-400">8,200 TRCs</div>
              <span className="text-[11px] text-slate-400">Serial: {mintedCredits.serialNumberRange}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400">Brand Custody</span>
              <div className="text-lg font-bold text-white truncate">{mintedCredits.currentOwner}</div>
              <span className="text-[11px] text-emerald-400">Verified Allocated</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400">Batch Proof</span>
              <div className="text-lg font-mono font-bold text-cyan-400">VCR: TX-000184</div>
              <span className="text-[11px] text-slate-400">SHA-256 Digitally Signed</span>
            </div>
          </div>

          {/* Interactive Brand Usability / Retirement Section */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Brand Usability: Retire &amp; Burn Credits for Compliance</span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  When the brand markets the garment collection, burning credits generates an official immutable Proof of Offset.
                </p>
              </div>

              {mintedCredits.status === "RETIRED" && (
                <button
                  onClick={() => setViewingCertificate(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5 border border-amber-500/30 transition-colors"
                >
                  <Award className="w-4 h-4" />
                  <span>View Official Certificate</span>
                </button>
              )}
            </div>

            {mintedCredits.status !== "RETIRED" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Beneficiary Brand</label>
                  <input
                    type="text"
                    value={burnBrand}
                    onChange={(e) => setBurnBrand(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Garment Collection / SKU</label>
                  <input
                    type="text"
                    value={burnProduct}
                    onChange={(e) => setBurnProduct(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <button
                    onClick={handleRetireCredits}
                    disabled={isBurning}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
                  >
                    <Flame className="w-4 h-4" />
                    <span>{isBurning ? "Burning & Sealing..." : "Retire 8,200 TRCs"}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="text-amber-300 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Certificate #{retiredRecord?.certificateId || "CERT-RET-2026-9912"} Issued</span>
                  </div>
                  <p className="text-slate-400">
                    Permanently retired for <strong>{burnBrand}</strong> ({burnProduct}) under EU DPP &amp; CSRD Scope 3.
                  </p>
                </div>
                <button
                  onClick={() => setViewingCertificate(true)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 shrink-0"
                >
                  <Award className="w-4 h-4" />
                  <span>View Proof Certificate</span>
                </button>
              </div>
            )}
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              &larr; Back to Audit
            </button>

            <Link
              href="/dpp/TX-000184"
              className="px-5 py-2.5 rounded-xl glass-panel hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
            >
              <span>View Public Hangtag DPP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Modals */}
      <DocumentExtractionViewer
        document={inspectingDoc}
        onClose={() => setInspectingDoc(null)}
      />

      <DocumentUploaderModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onDocumentAdded={handleDocumentAdded}
      />

      <CertificateOfRetirementModal
        record={retiredRecord}
        credit={mintedCredits}
        isOpen={viewingCertificate}
        onClose={() => setViewingCertificate(false)}
      />
    </div>
  );
}
