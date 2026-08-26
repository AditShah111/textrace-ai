"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import { DEMO_SCENARIOS, CLEAN_DOCUMENTS, FRAUD_DOCUMENTS } from "@/lib/sample-data";
import { ExtractedDocumentData, VerifiedCircularityRecord, AuditAnomaly, MassBalanceLedger } from "@/types";
import { performMaterialAudit, AuditReconciliationResult } from "@/lib/audit-engine";
import DocumentExtractionViewer from "@/components/audit/DocumentExtractionViewer";
import MassBalanceWaterfall from "@/components/audit/MassBalanceWaterfall";
import AnomalyAlerts from "@/components/audit/AnomalyAlerts";
import DocumentUploaderModal from "@/components/audit/DocumentUploaderModal";
import {
  Cpu,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Layers,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Eye,
  FileText,
  Clock,
  QrCode,
  Coins
} from "lucide-react";

function AuditWorkspaceContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialScenario = searchParams?.get("scenario") || "clean-indian-chain";

  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(initialScenario);
  const [documents, setDocuments] = useState<ExtractedDocumentData[]>(CLEAN_DOCUMENTS);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<AuditReconciliationResult | null>(null);
  const [inspectingDoc, setInspectingDoc] = useState<ExtractedDocumentData | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isMinting, setIsMinting] = useState<boolean>(false);

  // Switch scenarios
  useEffect(() => {
    if (selectedScenarioId === "clean-indian-chain") {
      setDocuments(CLEAN_DOCUMENTS);
      const res = performMaterialAudit(CLEAN_DOCUMENTS, "BATCH-2026-IND-8842", "TX-000184");
      setAuditResult(res);
    } else if (selectedScenarioId === "fraud-manipulated-chain") {
      setDocuments(FRAUD_DOCUMENTS);
      const res = performMaterialAudit(FRAUD_DOCUMENTS, "BATCH-2026-MANIP-990", "TX-000990");
      setAuditResult(res);
    } else {
      setDocuments([]);
      setAuditResult(null);
    }
  }, [selectedScenarioId]);

  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      const res = performMaterialAudit(documents, "BATCH-2026-LIVE-" + Math.floor(1000 + Math.random() * 9000));
      setAuditResult(res);
      setIsAuditing(false);

      if (res.status === "VERIFIED") {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#10b981", "#34d399", "#06b6d4", "#ffffff"],
        });
      }
    }, 900);
  };

  const handleMintFromAudit = async () => {
    if (!auditResult || auditResult.status !== "VERIFIED") return;
    setIsMinting(true);
    try {
      await fetch("/api/credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          batchId: auditResult.vcr?.batchId || "BATCH-2026-IND-8842",
          vcrId: auditResult.vcr?.vcrId || "TX-000184",
          materialType: auditResult.vcr?.materialType || "Post-Industrial Cotton/Polyester Waste Blend",
          fiberComposition: "78.4% Cotton / 21.6% PET",
          verifiedYieldKg: auditResult.ledger.recycledYarnProducedKg || 8200,
          issuerEntity: "EcoSpin Reclaimers Pvt Ltd, Coimbatore",
          sourceMill: auditResult.vcr?.origin || "Sri Lakshmi Garment Mills Ltd, Tirupur",
        }),
      });
      router.push("/credits");
    } catch (err) {
      console.error(err);
    } finally {
      setIsMinting(false);
    }
  };

  const handleDocumentAdded = (newDoc: ExtractedDocumentData) => {
    const updated = [...documents, newDoc];
    setDocuments(updated);
    const res = performMaterialAudit(updated);
    setAuditResult(res);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <Cpu className="w-4 h-4" />
            <span>AI VERIFICATION ENGINE • v2.4 LIVE</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            AI Document Intelligence &amp; Material Audit
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Continuous forensic reconciliation of textile waste invoices, weighbridge metrics, lab specs &amp; scope certificates.
          </p>
        </div>

        {/* Global Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsUploadOpen(true)}
            className="px-4 py-2.5 rounded-xl glass-panel hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 hover:border-emerald-500/40 transition-colors"
          >
            <UploadCloud className="w-4 h-4 text-emerald-400" />
            <span>Upload Document</span>
          </button>
          <button
            onClick={handleRunAudit}
            disabled={isAuditing || documents.length === 0}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 disabled:opacity-50 transition-all hover:scale-105"
          >
            <RefreshCw className={`w-4 h-4 ${isAuditing ? "animate-spin" : ""}`} />
            <span>{isAuditing ? "Running Forensic Audit..." : "Execute AI Reconciliation"}</span>
          </button>
        </div>
      </div>

      {/* Scenario Switcher Tabs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Select Competition &amp; Live-Demo Scenario:
          </span>
          <span className="text-[11px] text-emerald-400 font-mono">1-Click Live Test</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DEMO_SCENARIOS.map((scen) => {
            const isSelected = scen.id === selectedScenarioId;
            const isClean = scen.type === "clean_pass";
            const isFraud = scen.type === "fraud_fail";

            return (
              <button
                key={scen.id}
                onClick={() => setSelectedScenarioId(scen.id)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? isClean
                      ? "glass-panel-glow border-emerald-500/50 bg-emerald-950/30"
                      : isFraud
                      ? "glass-panel-glow border-red-500/50 bg-red-950/30"
                      : "glass-panel-glow border-cyan-500/50 bg-cyan-950/30"
                    : "glass-panel border-slate-800 hover:border-slate-700 bg-slate-950/60"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                        isClean
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : isFraud
                          ? "bg-red-500/20 text-red-300 border border-red-500/30"
                          : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                      }`}
                    >
                      {scen.badge}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] text-slate-300 font-semibold flex items-center gap-1">
                        Active Case
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white">{scen.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{scen.description}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between font-mono">
                  <span>{scen.wasteOrigin.split("(")[0]}</span>
                  <span className="text-slate-300">→ {scen.brand}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Evidence Documents Tray (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-400" />
              <span>Evidence Package ({documents.length})</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Completeness: {auditResult?.evidenceCompletenessPercent || 0}%
            </span>
          </div>

          <div className="space-y-3">
            {documents.length === 0 ? (
              <div className="glass-panel p-8 rounded-2xl border-dashed border-slate-700 text-center space-y-3">
                <UploadCloud className="w-8 h-8 text-slate-500 mx-auto" />
                <p className="text-xs text-slate-400">No documents in this batch yet. Upload sample or test files.</p>
                <button
                  onClick={() => setIsUploadOpen(true)}
                  className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold"
                >
                  Add First Document
                </button>
              </div>
            ) : (
              documents.map((doc) => {
                const isFlagged = doc.certification?.status === "Expired" || doc.quantityKg > 12000;
                return (
                  <div
                    key={doc.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                      isFlagged
                        ? "bg-red-950/30 border-red-500/40"
                        : "glass-panel border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                            isFlagged
                              ? "bg-red-500/20 text-red-400"
                              : "bg-emerald-500/10 text-emerald-400"
                          }`}
                        >
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-white line-clamp-1">{doc.fileName}</h4>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                            <span className="uppercase text-emerald-400">{doc.documentType.replace("_", " ")}</span>
                            <span>•</span>
                            <span>{doc.fileSize}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setInspectingDoc(doc)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 font-medium flex items-center gap-1 shrink-0 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Extracted Mass:</span>
                        <span className="font-mono font-bold text-white">{doc.quantityKg.toLocaleString()} kg</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Blend Spec:</span>
                        <span className="text-slate-300 font-medium">{doc.composition.cottonPercentage}% Cotton</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Mass Balance & Audit Result (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {auditResult ? (
            <>
              {/* VCR Status Banner */}
              <div
                className={`p-6 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl ${
                  auditResult.status === "VERIFIED"
                    ? "bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-teal-950/40 border-emerald-500/40"
                    : "bg-gradient-to-r from-red-950/40 via-slate-900/80 to-slate-950 border-red-500/50"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                        auditResult.status === "VERIFIED"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      Audit Score: {auditResult.auditScoreNumeric}/100
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      AI Risk: <strong className={auditResult.status === "VERIFIED" ? "text-emerald-400" : "text-red-400"}>{auditResult.aiRiskScore}</strong>
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white flex items-center gap-2">
                    {auditResult.status === "VERIFIED" ? (
                      <>
                        <ShieldCheck className="w-6 h-6 text-emerald-400" />
                        <span>VCR: {auditResult.vcr?.vcrId || "TX-000184"} (VERIFIED)</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-6 h-6 text-red-400" />
                        <span>AUDIT BLOCKED: HIGH RISK</span>
                      </>
                    )}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {auditResult.status === "VERIFIED"
                      ? "Evidence-backed mass conservation confirmed. Ready to mint verified recycling credits."
                      : "Critical mass conservation violation or certificate anomaly detected. Credit minting blocked."}
                  </p>
                </div>

                {auditResult.status === "VERIFIED" && (
                  <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
                    <button
                      onClick={handleMintFromAudit}
                      disabled={isMinting}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
                    >
                      <Coins className="w-4 h-4" />
                      <span>Mint 8,200 TRCs</span>
                    </button>
                    <Link
                      href={`/dpp/${auditResult.vcr?.vcrId || "TX-000184"}`}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl glass-panel hover:bg-slate-800 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                    >
                      <QrCode className="w-4 h-4 text-emerald-400" />
                      <span>QR Passport</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Mass Balance Waterfall */}
              <MassBalanceWaterfall ledger={auditResult.ledger} />

              {/* Anomaly Breakdown Alert Center */}
              <AnomalyAlerts anomalies={auditResult.anomalies} />
            </>
          ) : (
            <div className="glass-panel p-12 rounded-3xl border-slate-800 text-center space-y-4">
              <RefreshCw className="w-8 h-8 text-slate-500 mx-auto animate-spin" />
              <h4 className="text-base font-bold text-white">Ready for Audit Ingestion</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Click Execute AI Reconciliation or select one of the pre-loaded scenarios above to start auditing.
              </p>
            </div>
          )}
        </div>
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
    </div>
  );
}

export default function AuditWorkspacePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400 font-mono text-xs">Loading Audit Workspace...</div>}>
      <AuditWorkspaceContent />
    </Suspense>
  );
}
