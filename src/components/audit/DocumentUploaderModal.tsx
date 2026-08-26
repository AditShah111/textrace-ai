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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Upload &amp; Extract Document Evidence</h3>
              <p className="text-xs text-slate-500">AI parses unstructured PDFs, weighbridge slips &amp; lab tests in &lt; 2 seconds</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors font-bold text-sm">
            ✕
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5 text-xs">
          {/* Quick Presets */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-slate-600 block">1-Click Test Templates:</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleQuickPreset("lab")}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium transition-colors"
              >
                🔬 Intertek Fiber Lab Report
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset("weighbridge")}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium transition-colors"
              >
                ⚖️ Highway Weighbridge Ticket
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset("grs")}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium transition-colors"
              >
                📜 GRS Scope Certificate
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-700 font-bold block">Document File Name</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="e.g. SGS_AATCC20A_Fiber_Composition_Test.pdf"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 shadow-2xs font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-700 font-bold block">Document Type</label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-600 shadow-2xs"
            >
              <option value="waste_invoice">Mill Waste Invoice</option>
              <option value="weighbridge_slip">Weighbridge Gross/Tare Ticket</option>
              <option value="lab_report">Quantitative Fiber Lab Test (AATCC 20A)</option>
              <option value="recycling_certificate">RCS / GRS Scope Certificate</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-700 font-bold block">Document Content / OCR Text Snippet</label>
            <textarea
              rows={4}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Paste raw text or test report parameters..."
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 font-mono text-xs focus:outline-none focus:border-emerald-600 shadow-2xs"
            />
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleProcess}
            disabled={isProcessing}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-2 shadow-xs transition-all hover:scale-105 disabled:opacity-50"
          >
            {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{isProcessing ? "Extracting Evidence..." : "Extract & Add to Batch"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
