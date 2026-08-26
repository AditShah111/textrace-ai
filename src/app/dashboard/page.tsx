"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  TrendingUp,
  Search,
  Filter,
  Download,
  ExternalLink,
  Cpu,
  Scale,
  Leaf,
  PlusCircle,
  Eye,
  CheckCircle2
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const BATCH_DATA = [
  {
    vcrId: "TX-000184",
    batchId: "BATCH-2026-IND-8842",
    date: "2026-08-22",
    material: "Pre-Consumer Combed Cotton/Poly",
    origin: "Sri Lakshmi Garment Mills (Tirupur)",
    brand: "Nordic EcoWear Global",
    wasteKg: 10000,
    outputKg: 8200,
    recoveryRate: "82.66%",
    risk: "Low",
    status: "VERIFIED",
  },
  {
    vcrId: "TX-000183",
    batchId: "BATCH-2026-IND-8820",
    date: "2026-08-18",
    material: "100% Recycled Cotton Jersey Scrap",
    origin: "Tirupur Knit Hub Unit 4",
    brand: "Patagonia Tier 2 Supplier",
    wasteKg: 15400,
    outputKg: 12800,
    recoveryRate: "83.11%",
    risk: "Low",
    status: "VERIFIED",
  },
  {
    vcrId: "TX-000182",
    batchId: "BATCH-2026-IND-8790",
    date: "2026-08-15",
    material: "Post-Consumer Denim Scrap",
    origin: "Surat Fiber Reclaimers",
    brand: "Nudie Jeans Co",
    wasteKg: 22000,
    outputKg: 17600,
    recoveryRate: "80.00%",
    risk: "Low",
    status: "VERIFIED",
  },
  {
    vcrId: "TX-000990",
    batchId: "BATCH-2026-MANIP-990",
    date: "2026-08-24",
    material: "Manipulated Claim Cotton Scrap",
    origin: "Shree Waste Traders (Surat)",
    brand: "Global FastFashion Retailer",
    wasteKg: 10000,
    outputKg: 12500,
    recoveryRate: "125.6%",
    risk: "Critical",
    status: "FAILED",
  },
  {
    vcrId: "TX-000180",
    batchId: "BATCH-2026-IND-8740",
    date: "2026-08-10",
    material: "Organic Cotton Cutting Clip",
    origin: "Coimbatore EcoSpin",
    brand: "Armedangels",
    wasteKg: 8500,
    outputKg: 7100,
    recoveryRate: "83.52%",
    risk: "Low",
    status: "VERIFIED",
  },
];

const CHART_DATA = [
  { name: "Batch 8740", inputKg: 8500, outputKg: 7100, lossKg: 1400 },
  { name: "Batch 8790", inputKg: 22000, outputKg: 17600, lossKg: 4400 },
  { name: "Batch 8820", inputKg: 15400, outputKg: 12800, lossKg: 2600 },
  { name: "Batch 8842", inputKg: 10000, outputKg: 8200, lossKg: 1800 },
];

export default function ComplianceDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredBatches = BATCH_DATA.filter((b) => {
    const matchesSearch =
      b.vcrId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.material.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    const headers = "VCR_ID,Batch_ID,Date,Origin,Brand,Waste_KG,Output_KG,Recovery_Rate,Status\n";
    const rows = BATCH_DATA.map(
      (b) => `${b.vcrId},${b.batchId},${b.date},"${b.origin}","${b.brand}",${b.wasteKg},${b.outputKg},${b.recoveryRate},${b.status}`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TexTrace_Compliance_Registry_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Title & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Layers className="w-4 h-4" />
            <span>ENTERPRISE CIRCULARITY &amp; ESG HUB</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Digital Compliance &amp; Traceability Registry
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Audit-ready chain of custody records, mass-balance ledgers, and verified circularity passports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl glass-panel hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 hover:border-emerald-500/40 transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export ESG CSV</span>
          </button>
          <Link
            href="/audit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all hover:scale-105"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Batch Audit</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Total Waste Diverted</span>
            <Leaf className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">55,900 kg</div>
          <div className="text-[11px] text-emerald-400 font-medium">↑ +18.4% vs previous cycle</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Verified Recycled Yarn</span>
            <Scale className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">45,700 kg</div>
          <div className="text-[11px] text-slate-400 font-mono">Avg Recovery Rate: 82.3%</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Audit Pass Rate</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">96.8%</div>
          <div className="text-[11px] text-slate-400 font-mono">14 Inconsistencies Caught</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Blocked Phantom Mass</span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-red-400">2,550 kg</div>
          <div className="text-[11px] text-red-300 font-medium">Prevented fictitious credits</div>
        </div>
      </div>

      {/* Mass Flow Chart */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white">Verified Mass-Balance Distribution (kg)</h3>
            <p className="text-xs text-slate-400">Inbound Waste vs Recycled Yarn Output vs Process Loss</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            Conservation Balanced
          </span>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" textAnchor="middle" tick={{ fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", fontSize: "12px" }}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
              <Bar dataKey="inputKg" name="Verified Input Waste (kg)" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="outputKg" name="Recycled Yarn Output (kg)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              <Bar dataKey="lossKg" name="Process Loss (kg)" fill="#64748b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Verified Batch Registry Table */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white">Verified Circularity Registry</h3>
            <p className="text-xs text-slate-400">All audited textile batches with cryptographic verification status</p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search batch ID, origin, brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-64"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="VERIFIED">Verified Only</option>
              <option value="FAILED">Failed / Blocked</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                <th className="py-3 px-3">VCR ID / Batch</th>
                <th className="py-3 px-3">Material &amp; Origin</th>
                <th className="py-3 px-3">Destination Brand</th>
                <th className="py-3 px-3">Mass (Waste → Output)</th>
                <th className="py-3 px-3">Recovery Rate</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredBatches.map((batch) => {
                const isVerified = batch.status === "VERIFIED";
                return (
                  <tr key={batch.vcrId} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-3 space-y-0.5">
                      <span className="font-mono font-bold text-white block">{batch.vcrId}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{batch.batchId}</span>
                    </td>
                    <td className="py-4 px-3 space-y-0.5 max-w-xs">
                      <span className="text-slate-200 font-medium block truncate">{batch.material}</span>
                      <span className="text-[10px] text-slate-400 block truncate">{batch.origin}</span>
                    </td>
                    <td className="py-4 px-3 text-slate-300 font-medium">{batch.brand}</td>
                    <td className="py-4 px-3 font-mono">
                      <span className="text-slate-300">{batch.wasteKg.toLocaleString()} kg</span>
                      <span className="text-slate-500 mx-1">→</span>
                      <span className={isVerified ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
                        {batch.outputKg.toLocaleString()} kg
                      </span>
                    </td>
                    <td className="py-4 px-3 font-mono font-semibold text-slate-300">
                      {batch.recoveryRate}
                    </td>
                    <td className="py-4 px-3">
                      {isVerified ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold font-mono">
                          VERIFIED
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 text-[10px] font-bold font-mono">
                          FAILED
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-3 text-right">
                      {isVerified ? (
                        <Link
                          href={`/dpp/${batch.vcrId}`}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View DPP</span>
                        </Link>
                      ) : (
                        <Link
                          href="/audit?scenario=fraud-manipulated-chain"
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 text-[11px] font-semibold transition-colors"
                        >
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Audit Log</span>
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
