"use client";

import React from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, ArrowRight, ShieldCheck, CheckCircle2, Factory, Truck, Cpu, Layers, Shirt, ExternalLink } from "lucide-react";

export default function DppShowcase() {
  const sampleUrl = typeof window !== "undefined" ? `${window.location.origin}/dpp/TX-000184` : "https://textrace.ai/dpp/TX-000184";

  return (
    <section className="py-24 bg-gradient-to-b from-slate-950/60 via-slate-900/30 to-slate-950/80 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <QrCode className="w-3.5 h-3.5" />
            <span>Digital Product Passport (DPP) &amp; QR Layer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Evidence-Backed Digital Traceability from Scrap to Store
          </h2>
          <p className="text-base text-slate-300">
            For every successfully verified batch, TexTrace AI issues a <strong>Verified Circularity Record (VCR)</strong> and a consumer/auditor-facing Digital Product Passport accessible via QR code on garments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* DPP Card Mockup */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/20">
                  EU DPP v1.4 Standard
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">Nordic EcoWear Circular Jersey</h3>
                <p className="text-xs text-slate-400 font-mono">VCR ID: TX-000184 • Batch #BATCH-2026-IND-8842</p>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>100% RECONCILED</span>
              </div>
            </div>

            {/* 5-Stage Chain of Custody Nodes Preview */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Verified 5-Stage Chain of Custody
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <Factory className="w-4 h-4 text-emerald-400 mx-auto" />
                  <div className="font-bold text-white text-[11px]">1. Waste Mill</div>
                  <div className="text-[10px] text-slate-400">Tirupur, IN</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <Truck className="w-4 h-4 text-cyan-400 mx-auto" />
                  <div className="font-bold text-white text-[11px]">2. Weighbridge</div>
                  <div className="text-[10px] text-slate-400">Coimbatore</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <Cpu className="w-4 h-4 text-emerald-400 mx-auto" />
                  <div className="font-bold text-white text-[11px]">3. Recycler</div>
                  <div className="text-[10px] text-slate-400">EcoSpin</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <Layers className="w-4 h-4 text-emerald-400 mx-auto" />
                  <div className="font-bold text-white text-[11px]">4. Yarn Spinner</div>
                  <div className="text-[10px] text-slate-400">Apex Yarns</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <Shirt className="w-4 h-4 text-teal-400 mx-auto" />
                  <div className="font-bold text-white text-[11px]">5. Garment Brand</div>
                  <div className="text-[10px] text-slate-400">Stockholm</div>
                </div>
              </div>
            </div>

            {/* Blend & Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Material Blend</span>
                <span className="font-bold text-white text-sm">78.4% Rec. Cotton</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Waste Diverted</span>
                <span className="font-bold text-emerald-400 text-sm">10,000 kg</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">CO₂ Avoided</span>
                <span className="font-bold text-cyan-400 text-sm">21,320 kg</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Water Saved</span>
                <span className="font-bold text-emerald-400 text-sm">1.98M Liters</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/dpp/TX-000184"
                className="w-full py-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold text-xs flex items-center justify-center gap-2 border border-emerald-500/30 transition-colors"
              >
                <span>View Full Public Passport &amp; Audit Trail</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* QR Code & Mobile Scan Visualizer */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border-slate-800 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 mx-auto flex items-center justify-center text-emerald-400">
              <QrCode className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Live Hangtag QR Scanner</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Scan this QR code with any smartphone camera to inspect the real-time verified circularity record.
              </p>
            </div>

            {/* Generated QR Code */}
            <div className="inline-block p-4 rounded-2xl bg-white shadow-2xl mx-auto">
              <QRCodeSVG
                value="/dpp/TX-000184"
                size={160}
                level="H"
                includeMargin={false}
              />
            </div>

            <div className="text-[11px] font-mono text-slate-400">
              Direct Link: <Link href="/dpp/TX-000184" className="text-emerald-400 hover:underline">/dpp/TX-000184</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
