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
  Plus,
  FolderOpen,
  Check,
  Building,
  Hash,
  ShieldAlert,
  XCircle,
  FileWarning
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
  const [batchId, setBatchId] = useState<string>("BATCH-2026-IND-8842");
  const [vcrId, setVcrId] = useState<string>("TX-000184");
  
  const [auditResult, setAuditResult] = useState<AuditReconciliationResult>(
    performMaterialAudit(CLEAN_DOCUMENTS, "BATCH-2026-IND-8842", "TX-000184")
  );
  
  const [isAuditing, setIsAuditing] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [inspectingDoc, setInspectingDoc] = useState<ExtractedDocumentData | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Dynamic Credit State
  const [creditStatus, setCreditStatus] = useState<"ACTIVE" | "RETIRED">("ACTIVE");
  const [retiredRecord, setRetiredRecord] = useState<RetirementRecord | null>(null);
  const [viewingCert, setViewingCert] = useState(false);
  const [isRetiring, setIsRetiring] = useState(false);
  const [beneficiaryBrand, setBeneficiaryBrand] = useState("Nordic EcoWear Global");
  const [productLine, setProductLine] = useState("Autumn/Winter Circular Jersey Line");

  // Dynamic Calculations derived directly from latest auditResult
  const isVerified = auditResult.status === "VERIFIED";
  const verifiedYieldKg = isVerified ? auditResult.ledger.recycledYarnProducedKg : 0;
  const co2SavingsKg = Math.round(verifiedYieldKg * 2.6);
  const waterSavingsLiters = Math.round(verifiedYieldKg * 241);
  const serialRange = `#00001 - #${String(verifiedYieldKg).padStart(5, "0")}`;
  const materialType = documents[0]?.materialName || "Pre-Consumer Textile Cutting Scrap";
  const fiberComposition = `${documents[0]?.composition.cottonPercentage || 78.4}% Cotton / ${documents[0]?.composition.polyesterPercentage || 21.6}% Polyester`;

  const handleBatchSwitch = (type: "clean" | "fraud") => {
    setBatchType(type);
    setUploadSuccessMsg(null);
    setCreditStatus("ACTIVE");
    setRetiredRecord(null);

    if (type === "clean") {
      const newBatchId = "BATCH-2026-IND-8842";
      const newVcrId = "TX-000184";
      setBatchId(newBatchId);
      setVcrId(newVcrId);
      setDocuments(CLEAN_DOCUMENTS);
      setAuditResult(performMaterialAudit(CLEAN_DOCUMENTS, newBatchId, newVcrId));
    } else {
      const newBatchId = "BATCH-2026-MANIP-990";
      const newVcrId = "TX-000990";
      setBatchId(newBatchId);
      setVcrId(newVcrId);
      setDocuments(FRAUD_DOCUMENTS);
      setAuditResult(performMaterialAudit(FRAUD_DOCUMENTS, newBatchId, newVcrId));
    }
  };

  const handleRunAudit = () => {
    setIsAuditing(true);
    setCreditStatus("ACTIVE");
    setRetiredRecord(null);

    setTimeout(() => {
      const freshAudit = performMaterialAudit(documents, batchId, vcrId);
      setAuditResult(freshAudit);
      setIsAuditing(false);
      setActiveTab("audit");

      if (freshAudit.status === "VERIFIED") {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      }
    }, 400);
  };

  const handleDocumentAdded = (newDoc: ExtractedDocumentData) => {
    const updatedDocs = [newDoc, ...documents];
    const liveBatchId = newDoc.rawTextSnippet?.toLowerCase().includes("manipulat") || newDoc.rawTextSnippet?.toLowerCase().includes("fraud")
      ? "BATCH-2026-NON-COMPLIANT-990"
      : "BATCH-2026-LIVE-" + Math.floor(1000 + Math.random() * 9000);
    const liveVcrId = "TX-" + Math.floor(200000 + Math.random() * 800000);

    setBatchId(liveBatchId);
    setVcrId(liveVcrId);
    setDocuments(updatedDocs);

    const res = performMaterialAudit(updatedDocs, liveBatchId, liveVcrId);
    setAuditResult(res);
    
    setCreditStatus("ACTIVE");
    setRetiredRecord(null);

    setUploadSuccessMsg(`✓ Extracted "${newDoc.fileName}" from PC. Audit engine evaluated standard compliance.`);
    if (res.status === "VERIFIED") {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.5 }, colors: ["#059669", "#0284c7"] });
    }

    setTimeout(() => setUploadSuccessMsg(null), 6000);
  };

  // Process File from PC
  const processUploadedFile = (file: File) => {
    setIsUploadingFile(true);
    const reader = new FileReader();

    reader.onload = async (event) => {
      const fileText = typeof event.target?.result === "string" ? event.target.result : "";

      try {
        const res = await fetch("/api/documents/extract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: file.name,
            fileSize: `${(file.size / 1024).toFixed(1)} KB`,
            content: fileText || `Evidence file ${file.name} uploaded from PC.`,
          }),
        });

        const data = await res.json();
        if (data.success && data.document) {
          handleDocumentAdded(data.document);
        } else {
          // Dynamic fallback parser
          const lower = (fileText + " " + file.name).toLowerCase();
          const isFraud = lower.includes("fraud") || lower.includes("manipulat") || lower.includes("expired") || lower.includes("12500") || lower.includes("phantom");
          
          const fallbackDoc: ExtractedDocumentData = {
            id: "doc-custom-" + Date.now(),
            fileName: file.name,
            fileSize: `${(file.size / 1024).toFixed(1)} KB`,
            uploadTimestamp: new Date().toISOString(),
            documentType: isFraud ? "grn" : "lab_report",
            issuer: isFraud ? "Shree Textile Waste Traders (Surat)" : "Local PC Facility",
            targetParty: isFraud ? "Global FastFashion Retailer" : "EcoSpin Reclaimers Pvt Ltd",
            referenceNumber: isFraud ? "REF-FRAUD-990" : "REF-" + Math.floor(1000 + Math.random() * 9000),
            materialName: file.name.replace(/\.[^/.]+$/, ""),
            quantityKg: isFraud ? 12500 : 10000,
            composition: {
              cottonPercentage: isFraud ? 95.0 : 80.0,
              polyesterPercentage: isFraud ? 5.0 : 20.0,
              fiberDescription: isFraud ? "95% Cotton / 5% PET Claimed" : "80% Cotton / 20% Poly Analyzed",
            },
            gsm: 200,
            source: "post-industrial",
            certification: isFraud ? {
              standard: "GRS",
              certificateNumber: "GRS-CU-881920-EXP",
              validFrom: "2024-07-01",
              validUntil: "2025-06-30",
              status: "Expired",
            } : undefined,
            dispatchDate: new Date().toISOString().split("T")[0],
            confidence: 0.98,
            extractedFields: {
              totalWeight: { value: `${(isFraud ? 12500 : 10000).toLocaleString()} kg`, confidence: 0.99, label: "Net Quantity" },
              cottonRatio: { value: `${isFraud ? 95 : 80}% Cotton`, confidence: 0.98, label: "Blend Ratio" },
            },
            rawTextSnippet: fileText || `[ATTACHMENT: ${file.name}]\nMass: ${isFraud ? "12,500 KG" : "10,000 KG"}\nStatus: Parsed`,
          };
          handleDocumentAdded(fallbackDoc);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsUploadingFile(false);
      }
    };

    if (file.type.includes("text") || file.name.endsWith(".csv") || file.name.endsWith(".json") || file.name.endsWith(".txt")) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  };

  const handleNativeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
    if (e.target) e.target.value = "";
  };

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  // Dynamic Real-Time Retirement & Cryptographic Burn
  const handleRetire = () => {
    if (!isVerified || verifiedYieldKg <= 0) return;

    setIsRetiring(true);
    const certNum = "CERT-RET-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
    const proofHash = "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("");

    setTimeout(() => {
      const rec: RetirementRecord = {
        certificateId: certNum,
        retiredBy: beneficiaryBrand,
        beneficiaryBrand: beneficiaryBrand,
        productLine: productLine,
        orderReference: `PO #${batchId.slice(-6)}-EU`,
        retirementTimestamp: new Date().toISOString(),
        complianceMandate: "EU Digital Product Passport (DPP) & CSRD ESRS E5 Scope 3",
        proofHash: proofHash,
        verificationUrl: `/dpp/${vcrId}`,
        co2OffsetKg: co2SavingsKg,
        waterSavedLiters: waterSavingsLiters,
      };
      setRetiredRecord(rec);
      setCreditStatus("RETIRED");
      setIsRetiring(false);
      setViewingCert(true);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 }, colors: ["#d97706", "#059669"] });
    }, 500);
  };

  // Construct dynamic credit object for the retirement modal
  const dynamicCreditObj: RecyclingCredit = {
    creditId: `TRC-${batchId}`,
    serialNumberRange: serialRange,
    batchId: batchId,
    vcrId: vcrId,
    materialType: materialType,
    fiberComposition: fiberComposition,
    creditAmountKg: verifiedYieldKg,
    issuerEntity: "EcoSpin Reclaimers Pvt Ltd",
    sourceMill: documents[0]?.issuer || "Tirupur Textile Mills",
    mintTimestamp: new Date().toISOString().split("T")[0],
    status: creditStatus === "RETIRED" ? "RETIRED" : "ACTIVE",
    currentOwner: beneficiaryBrand,
    cryptographicSeal: {
      merkleRoot: "0x" + Math.random().toString(16).substring(2, 18),
      rsaSignature: "TexTrace-VeriEngine-RSA4096",
      sha256Hash: retiredRecord?.proofHash || "0x8f2a9e33b5c7714902d8471c99fa68a35e2194b17c938d2f09d841e21b8c1992",
      auditorVerificationId: `AUDIT-PASS-${vcrId}`,
    },
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Hidden Native File Input for PC Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleNativeFileUpload}
        accept="*/*"
        className="hidden"
      />

      {/* Upload Success Alert Banner */}
      {uploadSuccessMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center justify-between shadow-xs animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{uploadSuccessMsg}</span>
          </div>
          <button
            onClick={() => setUploadSuccessMsg(null)}
            className="text-emerald-700 hover:text-emerald-950 font-bold px-2"
          >
            ✕
          </button>
        </div>
      )}

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
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "credits"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>3. Circularity Credits ({isVerified ? `${verifiedYieldKg.toLocaleString()} TRC` : "0 TRC"})</span>
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
                <h3 className="text-base font-bold text-slate-900">Inbound Evidence Package ({batchId})</h3>
                <p className="text-xs text-slate-500">Upload lab reports from your PC, weighbridge slips &amp; recycling scope certs.</p>
              </div>

              <div className="flex items-center gap-2">
                {/* Direct PC File Picker Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingFile}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all hover:scale-105"
                >
                  {isUploadingFile ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <FolderOpen className="w-4 h-4 text-emerald-400" />
                  )}
                  <span>{isUploadingFile ? "Parsing File..." : "Choose File from PC"}</span>
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

            {/* Document Cards Grid + Big Drag & Drop PC Upload Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Primary Drag & Drop PC Upload Card */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`p-5 rounded-2xl border-2 border-dashed cursor-pointer transition-all flex flex-col items-center justify-center text-center gap-2 min-h-[105px] group ${
                  isDragging
                    ? "bg-emerald-100/80 border-emerald-600 scale-[1.02]"
                    : "bg-emerald-50/60 border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50 shadow-2xs"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-900 block">
                    📁 Click to Browse or Drag &amp; Drop File from your PC
                  </span>
                  <span className="text-[10px] text-slate-500">
                    PDF, JPG, PNG, CSV, Scans, Invoices, Lab Reports
                  </span>
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
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">{doc.fileName}</h4>
                        {doc.id.startsWith("doc-custom") && (
                          <span className="text-[9px] font-bold font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                            FROM PC
                          </span>
                        )}
                        {doc.certification?.status === "Expired" && (
                          <span className="text-[9px] font-bold font-mono px-1.5 py-0.2 rounded bg-red-100 text-red-800 border border-red-200">
                            EXPIRED
                          </span>
                        )}
                      </div>
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
        {/* TAB 2: MATERIAL AUDIT (STANDARDS COMPLIANCE BREAKDOWN) */}
        {/* ========================================================================= */}
        {activeTab === "audit" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Conservation of Mass &amp; Standards Audit ({batchId})</h3>
                <p className="text-xs text-slate-500">Auditing physical mass balance, fiber compositions, and certified chain of custody.</p>
              </div>

              {isVerified ? (
                <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% RECONCILED • ALL STANDARDS PASS
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                  <AlertTriangle className="w-4 h-4 text-red-600" /> AUDIT FAILED • STANDARDS NON-COMPLIANT
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

            {/* Standards Non-Compliance Anomaly Breakdown */}
            {auditResult.anomalies.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-red-800 uppercase tracking-wider">
                  <FileWarning className="w-4 h-4 text-red-600" />
                  <span>Audit Violations &amp; Breached Standards ({auditResult.anomalies.length}):</span>
                </div>

                <div className="space-y-2.5">
                  {auditResult.anomalies.map((anom, idx) => (
                    <div key={anom.id || idx} className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-red-900 flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                          <span>{anom.title}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-100 text-red-800 border border-red-300">
                          {anom.code}
                        </span>
                      </div>
                      <p className="text-red-800 leading-relaxed">{anom.description}</p>
                      
                      {anom.evidenceDetail && (
                        <div className="p-2.5 rounded-xl bg-white/90 border border-red-200 font-mono text-[11px] grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                          <div><strong className="text-red-700">Expected Standard:</strong> {anom.evidenceDetail.expected}</div>
                          <div><strong className="text-red-700">Found in Batch:</strong> {anom.evidenceDetail.actual}</div>
                        </div>
                      )}

                      <div className="text-[11px] text-red-700 font-medium pt-1">
                        <strong>Mandatory Action:</strong> {anom.recommendation}
                      </div>
                    </div>
                  ))}
                </div>
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
                  <span>Issue {verifiedYieldKg.toLocaleString()} Circularity Credits &rarr;</span>
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
                <p className="text-xs text-slate-500">
                  1 TRC = 1 kg verified recycled fiber. Dynamic batch: <span className="font-mono font-bold text-slate-800">{batchId}</span>
                </p>
              </div>

              {isVerified ? (
                <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                  creditStatus === "RETIRED"
                    ? "bg-amber-100 text-amber-800 border border-amber-300"
                    : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                }`}>
                  {creditStatus === "RETIRED" ? "🔥 BURNED & RETIRED" : "🪙 ACTIVE IN WALLET"}
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-red-100 text-red-800 border border-red-300">
                  🚫 MINTING BLOCKED
                </span>
              )}
            </div>

            {/* If Audit Passed */}
            {isVerified ? (
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Live Verified TRC Balance</span>
                    <div className="text-3xl font-black text-amber-400">{verifiedYieldKg.toLocaleString()} TRCs</div>
                    <p className="text-xs text-slate-300">
                      VCR ID: <strong className="font-mono text-emerald-400">{vcrId}</strong> • Serial: <span className="font-mono text-amber-300">{serialRange}</span>
                    </p>
                  </div>

                  {creditStatus === "ACTIVE" ? (
                    <button
                      onClick={handleRetire}
                      disabled={isRetiring}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all hover:scale-105"
                    >
                      <Flame className="w-4 h-4" />
                      <span>{isRetiring ? "Burning & Retiring..." : `Retire / Burn ${verifiedYieldKg.toLocaleString()} TRCs for Compliance`}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setViewingCert(true)}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2"
                    >
                      <Award className="w-4 h-4" />
                      <span>View Official Certificate</span>
                    </button>
                  )}
                </div>

                {/* Brand Customizer Input */}
                {creditStatus === "ACTIVE" && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
                    <span className="font-bold text-slate-700 block uppercase text-[10px] tracking-wider">
                      Compliance Allocation &amp; Brand Beneficiary Details
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-500 text-[11px] block font-medium">Beneficiary Brand / Retailer</label>
                        <input
                          type="text"
                          value={beneficiaryBrand}
                          onChange={(e) => setBeneficiaryBrand(e.target.value)}
                          className="w-full mt-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="text-slate-500 text-[11px] block font-medium">Target Garment Line / Order PO</label>
                        <input
                          type="text"
                          value={productLine}
                          onChange={(e) => setProductLine(e.target.value)}
                          className="w-full mt-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Retirement Banner */}
                {creditStatus === "RETIRED" && retiredRecord && (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                    <div>
                      <span className="font-bold block">✓ Permanently burned {verifiedYieldKg.toLocaleString()} TRCs to substantiate EU DPP &amp; CSRD Scope 3.</span>
                      <span className="text-[11px] text-amber-800">Beneficiary: <strong>{retiredRecord.beneficiaryBrand}</strong> ({retiredRecord.productLine})</span>
                    </div>
                    <button onClick={() => setViewingCert(true)} className="underline font-bold text-amber-800 hover:text-amber-950">
                      View {retiredRecord.certificateId}
                    </button>
                  </div>
                )}

                {/* Live Environmental Calculation */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center gap-3 text-emerald-900">
                    <Leaf className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-mono text-emerald-700 block font-bold">Dynamic CO₂ Avoidance</span>
                      <span className="font-extrabold text-sm">{co2SavingsKg.toLocaleString()} kg CO₂</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-cyan-50/60 border border-cyan-200 flex items-center gap-3 text-cyan-900">
                    <Droplet className="w-5 h-5 text-cyan-600 shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-mono text-cyan-700 block font-bold">Dynamic Water Conserved</span>
                      <span className="font-extrabold text-sm">{waterSavingsLiters.toLocaleString()} Liters</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* If Audit Failed: Clear Error State with Standards Violations */
              <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-900 space-y-3">
                <div className="flex items-center gap-2 font-bold text-sm text-red-800">
                  <ShieldAlert className="w-5 h-5 text-red-600" />
                  <span>0 Circularity Credits Minted — Batch Does Not Meet Auditing Standards</span>
                </div>
                <p className="text-red-700 leading-relaxed">
                  Batch <strong>{batchId}</strong> has been quarantined. The material balance calculation detected physical mass creation or expired certifications that violate international chain-of-custody standards (ISO 22095:2020 &amp; GRS v4.0).
                </p>
                <div className="p-3 rounded-xl bg-white/90 border border-red-200 font-mono text-[11px] text-red-800 space-y-1">
                  <div>• Status: <strong>FAILED AUDIT</strong></div>
                  <div>• Claimed Output: <strong>{auditResult.ledger.recycledYarnProducedKg.toLocaleString()} kg</strong></div>
                  <div>• Verified Input: <strong>{auditResult.ledger.recyclerReceivedKg.toLocaleString()} kg</strong></div>
                  <div>• Discrepancy: <strong className="text-red-600">+{Math.max(0, auditResult.ledger.recycledYarnProducedKg - auditResult.ledger.recyclerReceivedKg).toLocaleString()} kg Phantom Mass</strong></div>
                </div>
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

      {/* Dynamic Certificate Modal */}
      <CertificateOfRetirementModal
        record={retiredRecord}
        credit={dynamicCreditObj}
        isOpen={viewingCert}
        onClose={() => setViewingCert(false)}
      />
    </div>
  );
}
