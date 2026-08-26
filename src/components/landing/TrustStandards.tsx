import React from "react";
import { CheckCircle2, Award, Globe, FileCheck, Layers } from "lucide-react";

export default function TrustStandards() {
  const standards = [
    {
      name: "Recycled Claim Standard (RCS)",
      org: "Textile Exchange",
      desc: "Chain of custody verification for materials with 5% to 100% recycled content.",
      badge: "RCS 2.0 Ready",
    },
    {
      name: "Global Recycled Standard (GRS)",
      org: "Textile Exchange",
      desc: "Full verification of recycled input with environmental and social processing criteria.",
      badge: "GRS Compliant",
    },
    {
      name: "EU Digital Product Passport (DPP)",
      org: "European Commission",
      desc: "Mandatory product circularity, recycled fraction, and environmental footprint passport.",
      badge: "EU DPP Ready",
    },
    {
      name: "OEKO-TEX® Standard 100",
      org: "OEKO-TEX Association",
      desc: "Harmful substance testing & chemical compliance across recycled blends.",
      badge: "Toxic-Free Tested",
    },
  ];

  return (
    <section className="py-20 bg-slate-950/80 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
            Interoperability Ecosystem
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Engineered for Global Circular Standards &amp; Registries
          </h3>
          <p className="text-sm text-slate-400">
            TexTrace AI integrates seamlessly with accredited verification frameworks rather than creating ungrounded proprietary claims.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {standards.map((std, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-2xl border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                  {std.badge}
                </span>
                <h4 className="text-base font-bold text-white leading-snug">{std.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{std.desc}</p>
              </div>
              <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{std.org}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
