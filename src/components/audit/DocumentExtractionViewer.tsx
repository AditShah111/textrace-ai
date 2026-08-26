"use client";

import React from "react";
import { ExtractedDocumentData } from "@/types";
import { FileText, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, Building, Calendar, Scale, Layers } from "lucide-react";

interface Props {
  document: ExtractedDocumentData | null;
  onClose: () => void;
}

export default function DocumentExtractionViewer({ document, onClose }: Props) {
  if (!document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 leading-tight">{document.fileName}</h3>
              <p className="text-xs text-slate-500 font-mono">
                {document.fileSize} • Uploaded {new Date(document.uploadTimestamp).toLocaleDateString()}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Top Extracted Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 block font-mono">Document Type</span>
              <span className="text-xs font-bold text-slate-900 uppercase">{document.documentType.replace("_", " ")}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 block font-mono">Net Quantity</span>
              <span className="text-xs font-bold text-emerald-700 font-mono">{document.quantityKg.toLocaleString()} kg</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 block font-mono">Blend Spec</span>
              <span className="text-xs font-bold text-slate-900">
                {document.composition.cottonPercentage}% Cotton / {document.composition.polyesterPercentage}% PET
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 block font-mono">AI Confidence</span>
              <span className="text-xs font-bold text-emerald-700 font-mono">{(document.confidence * 100).toFixed(0)}% Match</span>
            </div>
          </div>

          {/* Issuer & Target Details */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Trading Entities &amp; Metadata</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  Issuing Facility:
                </span>
                <span className="font-bold text-slate-900">{document.issuer}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  Target Party:
                </span>
                <span className="font-bold text-slate-900">{document.targetParty}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Dispatch Date:
                </span>
                <span className="font-mono text-slate-800">{document.dispatchDate}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                  <Scale className="w-3.5 h-3.5 text-slate-400" />
                  Reference / Bill No:
                </span>
                <span className="font-mono text-slate-800">{document.referenceNumber}</span>
              </div>
            </div>
          </div>

          {/* Certification details */}
          {document.certification && (
            <div
              className={`p-4 rounded-2xl border text-xs space-y-2 ${
                document.certification.status === "Valid"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                  : "bg-red-50 border-red-200 text-red-900"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
                  {document.certification.standard} Scope Certificate ({document.certification.certificateNumber})
                </span>
                <span className="px-2 py-0.5 rounded-full font-mono text-[10px] font-bold bg-white/80 border border-slate-200">
                  {document.certification.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span>Valid: {document.certification.validFrom} to {document.certification.validUntil}</span>
              </div>
            </div>
          )}

          {/* OCR Raw Evidence Transcript */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
              AI Extracted Document Text
            </h4>
            <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-[11px] leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
              {document.rawTextSnippet}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-end bg-slate-50">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
