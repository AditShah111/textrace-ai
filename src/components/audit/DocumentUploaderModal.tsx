"use client";

import React, { useState } from "react";
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Sparkles, Loader2 } from "lucide-react";
import { ExtractedDocumentData } from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDocumentAdded: (doc: ExtractedDocumentData) => void;
}

export default function DocumentUploaderModal({ isOpen, onClose, onDocumentAdded }: Props) {
  const [fileName, setFileName] = useState("");
  const [rawText, setRawText] = useState("");
  const [docType, setDocType] = useState("waste_invoice");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleQuickPreset = (type: string) => {
    if (type === "lab") {
      setFileName("Intertek_Quantitative_Fiber_Analysis_RPT-904.pdf");
      setDocType("lab_report");
      setRawText("INTERTEK LAB REPORT\nTest Standard: AATCC 20A / ISO 1833\nLot: RECYCLED COTTON LOT #904\nCotton: 78.4%\nPolyester: 21.6%\nGSM: 220 g/m2\nHeavy Metals: None Detected. PASS.");
    } else if (type === "weighbridge") {
      setFileName("TamilNadu_Logistics_Gross_Tare_Slip_WB-4421.pdf");
      setDocType("weighbridge_slip");
      setRawText("TAMIL NADU STATE HIGHWAY WEIGHBRIDGE\nSlip ID: WB-4421\nGross Weight: 24,820 KG\nTare Weight: 14,900 KG\nNet Verified Weight: 9,920 KG\nVariance: -80 KG");
    } else if (type === "grs") {
      setFileName("ControlUnion_GRS_Scope_Certificate_2026.pdf");
      setDocType("recycling_certificate");
      setRawText("CONTROL UNION CERTIFICATIONS\nGlobal Recycled Standard (GRS) v4.0\nLicensee: EcoSpin Reclaimers\nStatus: ACTIVE & VALID\nValid: 01-JAN-2026 to 31-DEC-2026");
    }
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/documents/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: fileName || "User_Uploaded_Document.pdf",
          content: rawText || "Declared Quantity: 10,000 kg. Cotton: 78.4%, Poly: 21.6%",
          fileSize: "1.4 MB",
        }),
      });
      const data = await res.json();
      if (data.success && data.document) {
        onDocumentAdded(data.document);
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AI Document Ingestion Sandbox</h3>
              <p className="text-xs text-slate-400">Upload PDF/Text or paste raw supply chain certificate text</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2">✕</button>
        </div>

        {/* Quick sample templates */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-300">Quick Test Templates:</span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleQuickPreset("lab")}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
            >
              🧪 Lab Test Report (AATCC 20A)
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset("weighbridge")}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
            >
              ⚖️ Logistics Weighbridge Slip
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset("grs")}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
            >
              📜 GRS Scope Certificate
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Document File Name</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="e.g. SGS_Test_Certificate_TX_881.pdf"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Document OCR Text / Payload</label>
            <textarea
              rows={5}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Paste raw invoice text, weighbridge metrics, or lab composition percentages..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
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
            onClick={handleProcess}
            disabled={isProcessing}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Extracting AI Specs...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Parse &amp; Ingest Document</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
