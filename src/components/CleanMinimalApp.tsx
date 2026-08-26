"use client";

import React, { useState, useRef } from "react";
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
  ChevronRight,
  Plus
} from "lucide-react";
import { CLEAN_DOCUMENTS, FRAUD_DOCUMENTS } from "@/lib/sample-data";
import { ExtractedDocumentData } from "@/types";
import { performMaterialAudit, AuditReconciliationResult } from "@/lib/audit-engine";
import DocumentExtractionViewer from "@/components/audit/DocumentExtractionViewer";
import DocumentUploaderModal from "@/components/audit/DocumentUploaderModal";
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
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleDocumentAdded = (newDoc: ExtractedDocumentData) => {
    const updated = [newDoc, ...documents];
    setDocuments(updated);
    const res = performMaterialAudit(updated, "BATCH-2026-LIVE-USER", "TX-000299");
    setAuditResult(res);
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.5 }, colors: ["#059669", "#0284c7"] });
  };

  // Direct native file picker handler
  const handleNativeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newDoc: ExtractedDocumentData = {
      id: "doc-custom-" + Date.now(),
      fileName: file.name,
      fileSize: `${(file.size / 1024).toFixed(1)} KB`,
      uploadTimestamp: new Date().toISOString(),
      documentType: file.name.toLowerCase().includes("lab")
        ? "lab_report"
        : file.name.toLowerCase().includes("slip") || file.name.toLowerCase().includes("weigh")
        ? "weighbridge_slip"
        : "waste_invoice",
      issuer: "User Uploaded Facility",
      targetParty: "EcoSpin Reclaimers Pvt Ltd",
      referenceNumber: "REF-" + Math.floor(1000 + Math.random() * 9000),
      materialName: "Pre-Consumer Textile Cutting Scrap",
      quantityKg: 10000,
      composition: {
        cottonPercentage: 80.0,
        polyesterPercentage: 20.0,
        fiberDescription: "Analyzed Cotton/Poly Reclaimable Clip",
      },
      gsm: 190,
      source: "post-industrial",
      dispatchDate: new Date().toISOString().split("T")[0],
      confidence: 0.98,
      extractedFields: {
        totalWeight: { value: "10,000 kg", confidence: 0.99, label: "Net Quantity" },
        cottonRatio: { value: "80.0% Cotton", confidence: 0.98, label: "Blend Ratio" },
      },
      rawTextSnippet: `[AI PARSED ATTACHMENT: ${file.name}]\nDocument Type: Verified Textile Test Evidence\nNet Mass: 10,000.00 KG\nFiber Composition: 80% Cotton / 20% Polyester\nStatus: Successfully Extracted`,
    };

    handleDocumentAdded(newDoc);
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
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 }, colors: ["#d97706", "#059669"] });
    }, 600);
  };

  const isVerified = auditResult.status === "VERIFIED";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Hidden Native File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleNativeFileUpload}
        accept=".pdf,.png,.jpg,.jpeg,.csv,.json"
        className="hidden"
      />

      {/* Clean Segmented Control Bar */}
      <div className="bg-white border border-slate-200 p-1.5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("docs")}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "docs"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>1. Documents ({documents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("audit")}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "audit"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
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
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "credits"
                ? "bg-slate-900 text-white shadow-xs"
                : isVerified
                ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                : "opacity-40 cursor-not-allowed text-slate-400"
            }`}
          >
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>3. Circularity Credits</span>
          </button>
        </div>

        {/* 1-Click Scenario Preset Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs w-full sm:w-auto justify-center">
          <button
            onClick={() => handleBatchSwitch("clean")}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              batchType === "clean"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Authentic Batch
          </button>
          <button
            onClick={() => handleBatchSwitch("fraud")}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              batchType === "fraud"
                ? "bg-red-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Fraudulent Batch
          </button>
        </div>
      </div>

      {/* Main Clean Card View */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* ========================================================================= */}
        {/* TAB 1: DOCUMENTS */}
        {/* ========================================================================= */}
        {activeTab === "docs" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Inbound Evidence Package</h3>
                <p className="text-xs text-slate-500">Lab reports, weighbridge terminal slips &amp; recycling scope certificates.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsUploadOpen(true)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-1.5 border border-slate-200 transition-all hover:scale-105"
                >
                  <UploadCloud className="w-4 h-4 text-emerald-600" />
                  <span>Upload Document</span>
                </button>

                <button
                  onClick={handleRunAudit}
                  disabled={isAuditing}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all hover:scale-105"
                >
                  {isAuditing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Scale className="w-3.5 h-3.5" />}
                  <span>Run AI Audit &rarr;</span>
                </button>
              </div>
            </div>

            {/* Document Cards Grid + Big Upload Dropzone Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Primary Upload Dropzone Card */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-5 rounded-2xl bg-emerald-50/60 border-2 border-dashed border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50 cursor-pointer transition-all flex flex-col items-center justify-center text-center gap-2 group min-h-[96px]"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-900 block">+ Click to Upload Document / Lab Report</span>
                  <span className="text-[10px] text-slate-500">Supports PDF, JPG, PNG, CSV, Scans</span>
                </div>
              </div>

              {documents.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setInspectingDoc(doc)}
                  className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 cursor-pointer transition-all flex items-center justify-between group shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform shadow-2xs">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">{doc.fileName}</h4>
                      <p className="text-[10px] text-slate-500 font-mono">{doc.quantityKg.toLocaleString()} kg • {doc.composition.cottonPercentage}% Cotton</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-emerald-700 font-semibold">Inspect &rarr;</span>
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
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Conservation of Mass Audit</h3>
                <p className="text-xs text-slate-500">Verifying material movement from scrap generation to recycled yarn output.</p>
              </div>

              {isVerified ? (
                <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% RECONCILED
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                  <AlertTriangle className="w-4 h-4 text-red-600" /> ANOMALY DETECTED
                </span>
              )}
            </div>

            {/* Mass Flow Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase">1. Inbound Scrap</span>
                <div className="text-lg font-bold text-slate-900">{auditResult.ledger.wasteGeneratedKg.toLocaleString()} kg</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono text-amber-600 uppercase font-semibold">2. Transit Variance</span>
                <div className="text-lg font-bold text-amber-700">-{auditResult.ledger.transportLossKg} kg</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase">3. Spinning Loss</span>
                <div className="text-lg font-bold text-slate-700">-{auditResult.ledger.processingLossKg.toLocaleString()} kg</div>
              </div>
              <div className={`p-3.5 rounded-2xl border space-y-1 ${
                isVerified ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-red-50 border-red-200 text-red-900"
              }`}>
                <span className="text-[10px] font-mono uppercase font-bold">4. Recycled Output</span>
                <div className="text-lg font-bold">{auditResult.ledger.recycledYarnProducedKg.toLocaleString()} kg</div>
              </div>
            </div>

            {/* If fraud */}
            {auditResult.anomalies.length > 0 && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs space-y-2">
                <div className="font-bold text-red-800 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Physical Mass Violation Detected</span>
                </div>
                <p className="text-red-700">
                  Claimed output ({auditResult.ledger.recycledYarnProducedKg.toLocaleString()} kg) exceeds verified net input ({auditResult.ledger.recyclerReceivedKg.toLocaleString()} kg). Zero credits issued.
                </p>
              </div>
            )}

            {isVerified && (
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-mono text-emerald-700 font-semibold">Recovery Rate: {auditResult.ledger.recoveryRatePercent}%</span>
                <button
                  onClick={() => setActiveTab("credits")}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs"
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
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Textile Recycling Credits (TRCs)</h3>
                <p className="text-xs text-slate-500">1 TRC = 1 kg verified recycled fiber. Brands retire credits to prove compliance.</p>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                creditStatus === "RETIRED"
                  ? "bg-amber-100 text-amber-800 border border-amber-300"
                  : "bg-emerald-100 text-emerald-800 border border-emerald-300"
              }`}>
                {creditStatus === "RETIRED" ? "🔥 BURNED & RETIRED" : "🪙 ACTIVE IN WALLET"}
              </span>
            </div>

            {/* Credit Overview */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Verified Balance</span>
                <div className="text-3xl font-black text-amber-400">8,200 TRCs</div>
                <p className="text-xs text-slate-300">Allocated to <strong>Nordic EcoWear Global</strong></p>
              </div>

              {creditStatus === "ACTIVE" ? (
                <button
                  onClick={handleRetire}
                  disabled={isRetiring}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all hover:scale-105"
                >
                  <Flame className="w-4 h-4" />
                  <span>{isRetiring ? "Retiring..." : "Retire / Burn 8,200 TRCs for Compliance"}</span>
                </button>
              ) : (
                <button
                  onClick={() => setViewingCert(true)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>View Proof Certificate</span>
                </button>
              )}
            </div>

            {creditStatus === "RETIRED" && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                <span>✓ Permanently burned to substantiate EU DPP &amp; CSRD Scope 3 compliance.</span>
                <button onClick={() => setViewingCert(true)} className="underline font-bold text-amber-800 hover:text-amber-950">Certificate #CERT-RET-2026-9912</button>
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

      {/* Document Uploader Modal */}
      <DocumentUploaderModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onDocumentAdded={handleDocumentAdded}
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
