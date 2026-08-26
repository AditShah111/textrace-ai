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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">{document.fileName}</h3>
              <p className="text-xs text-slate-400 font-mono">
                {document.fileSize} • Uploaded {new Date(document.uploadTimestamp).toLocaleDateString()}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Top Extracted Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block font-mono">Document Type</span>
              <span className="text-xs font-bold text-white uppercase">{document.documentType.replace("_", " ")}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block font-mono">Net Quantity</span>
              <span className="text-xs font-bold text-emerald-400 font-mono">{document.quantityKg.toLocaleString()} kg</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block font-mono">Blend Spec</span>
              <span className="text-xs font-bold text-cyan-400">
                {document.composition.cottonPercentage}% Cotton / {document.composition.polyesterPercentage}% PET
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block font-mono">AI Confidence</span>
              <span className="text-xs font-bold text-emerald-400 font-mono">{(document.confidence * 100).toFixed(0)}% Match</span>
            </div>
          </div>

          {/* Extracted Key-Value Fields */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI Extracted Fields &amp; Confidence Scores</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(document.extractedFields).map(([key, field]) => (
                <div
                  key={key}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    field.isFlagged
                      ? "bg-red-950/30 border-red-500/40 text-red-200"
                      : "bg-slate-950/40 border-slate-800 text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-medium">
                    <span>{field.label}</span>
                    <span className="font-mono text-[10px] text-emerald-400">
                      {(field.confidence * 100).toFixed(0)}% Conf.
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-white break-words">
                    {field.value.toString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Raw Text OCR Snippet */}
          {document.rawTextSnippet && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                OCR / Raw Document Extract
              </h4>
              <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
                {document.rawTextSnippet}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
