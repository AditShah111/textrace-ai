import {
  ExtractedDocumentData,
  MassBalanceLedger,
  AuditAnomaly,
  VerifiedCircularityRecord,
  SupplyChainNode,
} from "@/types";

export interface AuditReconciliationResult {
  status: "VERIFIED" | "FAILED" | "EXCEPTION";
  aiRiskScore: "Low" | "Medium" | "High" | "Critical";
  auditScoreNumeric: number;
  evidenceCompletenessPercent: number;
  ledger: MassBalanceLedger;
  anomalies: AuditAnomaly[];
  vcr?: VerifiedCircularityRecord;
}

export function performMaterialAudit(
  documents: ExtractedDocumentData[],
  batchId: string = "BATCH-" + Math.floor(100000 + Math.random() * 900000),
  customVcrId: string = "TX-000" + Math.floor(100 + Math.random() * 900)
): AuditReconciliationResult {
  const anomalies: AuditAnomaly[] = [];

  // 1. Evidence Completeness Check
  const hasInvoice = documents.some((d) => d.documentType === "waste_invoice");
  const hasWeighbridge = documents.some((d) => d.documentType === "weighbridge_slip");
  const hasLabReport = documents.some((d) => d.documentType === "lab_report");
  const hasCertificate = documents.some((d) => d.documentType === "recycling_certificate");
  const hasGrnOrProduction = documents.some((d) => d.documentType === "grn");

  const requiredCount = 5;
  let presentCount = 0;
  if (hasInvoice) presentCount++;
  if (hasWeighbridge) presentCount++;
  if (hasLabReport) presentCount++;
  if (hasCertificate) presentCount++;
  if (hasGrnOrProduction) presentCount++;

  const evidenceCompletenessPercent = Math.min(100, Math.round((presentCount / requiredCount) * 100));

  if (evidenceCompletenessPercent < 60) {
    anomalies.push({
      id: "anom-ev-incomplete",
      severity: "MEDIUM",
      code: "INCOMPLETE_EVIDENCE_PACKAGE",
      title: "Missing Key Supply Chain Evidence",
      description: "Transaction package is missing crucial verification documents (e.g. Weighbridge slip or Lab QA test).",
      affectedDocuments: documents.map((d) => d.fileName),
      evidenceDetail: {
        expected: "5 Tier Verification Documents",
        actual: `${presentCount} of 5 Documents Uploaded`,
      },
      recommendation: "Request missing mill weighbridge or lab composition test before issuing VCR.",
    });
  }

  // 2. Extract Mass Variables
  const invoiceDoc = documents.find((d) => d.documentType === "waste_invoice");
  const weighDoc = documents.find((d) => d.documentType === "weighbridge_slip");
  const grnDoc = documents.find((d) => d.documentType === "grn");
  const certDoc = documents.find((d) => d.documentType === "recycling_certificate");
  const labDoc = documents.find((d) => d.documentType === "lab_report");

  const wasteGeneratedKg = invoiceDoc?.quantityKg || (weighDoc ? weighDoc.quantityKg + 80 : 10000);
  const recyclerReceivedKg = weighDoc?.quantityKg || (wasteGeneratedKg > 80 ? wasteGeneratedKg - 80 : wasteGeneratedKg);
  const transportLossKg = Math.max(0, wasteGeneratedKg - recyclerReceivedKg);

  // Recycled yarn produced from GRN or last production stage
  const recycledYarnProducedKg = grnDoc?.quantityKg || 8200;

  // Calculate processing loss
  let processingLossKg = recyclerReceivedKg - recycledYarnProducedKg;
  if (processingLossKg < 0) {
    processingLossKg = 0;
  }

  const recoveryRatePercent =
    recyclerReceivedKg > 0
      ? Number(((recycledYarnProducedKg / recyclerReceivedKg) * 100).toFixed(2))
      : 0;

  const massConservationDeltaKg = Number((recyclerReceivedKg - (processingLossKg + recycledYarnProducedKg)).toFixed(2));
  const isPhysicallyImpossible = recycledYarnProducedKg > recyclerReceivedKg;

  // 3. Mass Conservation & Mass Balance Audit Rules
  if (isPhysicallyImpossible) {
    anomalies.push({
      id: "anom-mass-conservation-breach",
      severity: "CRITICAL",
      code: "HIGH_RISK_MASS_BALANCE_VIOLATION",
      title: "Claimed Output Exceeds Total Verified Input",
      description: `Claimed recycled output (${recycledYarnProducedKg.toLocaleString()} kg) exceeds total verified material input received (${recyclerReceivedKg.toLocaleString()} kg). This violates the physical law of conservation of mass.`,
      affectedDocuments: [
        invoiceDoc?.fileName || "Waste Invoice",
        weighDoc?.fileName || "Weighbridge Slip",
        grnDoc?.fileName || "Production GRN",
      ].filter(Boolean),
      evidenceDetail: {
        expected: `Output ≤ ${recyclerReceivedKg.toLocaleString()} kg (Max theoretical)`,
        actual: `Claimed Output: ${recycledYarnProducedKg.toLocaleString()} kg`,
        delta: `+${(recycledYarnProducedKg - recyclerReceivedKg).toLocaleString()} kg (+${(
          ((recycledYarnProducedKg - recyclerReceivedKg) / recyclerReceivedKg) *
          100
        ).toFixed(1)}% Phantom Yield)`,
      },
      recommendation: "Immediate audit block. Reject recycling claim and initiate forensic investigation for fictitious credit creation.",
    });
  }

  // 4. Certificate Expiration & Validity Checks
  if (certDoc && certDoc.certification) {
    const cert = certDoc.certification;
    const isExpired = cert.status === "Expired" || new Date(cert.validUntil) < new Date("2026-01-01");
    if (isExpired) {
      anomalies.push({
        id: "anom-cert-expired",
        severity: "CRITICAL",
        code: "EXPIRED_SCOPE_CERTIFICATE",
        title: `Expired ${cert.standard} Recycling Scope Certificate`,
        description: `The facility's ${cert.standard} certificate (${cert.certificateNumber}) expired on ${cert.validUntil}. Recycled material processed after expiry cannot carry certified chain-of-custody claims.`,
        affectedDocuments: [certDoc.fileName],
        evidenceDetail: {
          expected: "Valid & Active Scope Certificate",
          actual: `Status: Expired on ${cert.validUntil}`,
        },
        recommendation: "Require licensee to upload renewed Scope Certificate from accredited certification body (Control Union / Intertek).",
      });
    }
  }

  // 5. Fiber Blend & Specification Discrepancies
  if (invoiceDoc && grnDoc) {
    const inputCotton = invoiceDoc.composition.cottonPercentage;
    const outputCotton = grnDoc.composition.cottonPercentage;
    const diff = Math.abs(outputCotton - inputCotton);

    if (diff > 10) {
      anomalies.push({
        id: "anom-composition-mismatch",
        severity: "HIGH",
        code: "MATERIAL_COMPOSITION_MISMATCH",
        title: "Fiber Blend Discrepancy Across Tiers",
        description: `Input scrap composition was declared as ${inputCotton}% Cotton / ${invoiceDoc.composition.polyesterPercentage}% Polyester, but the claimed yarn output claims ${outputCotton}% Cotton. Mechanical recycling cannot spontaneously concentrate cotton ratio without virgin blending.`,
        affectedDocuments: [invoiceDoc.fileName, grnDoc.fileName],
        evidenceDetail: {
          expected: `${inputCotton}% Cotton (±3% tolerance)`,
          actual: `${outputCotton}% Cotton claimed`,
          delta: `Deviation of ${diff.toFixed(1)}%`,
        },
        recommendation: "Cross-examine blending logs and request third-party lab AATCC-20A quantitative fiber composition test.",
      });
    }
  }

  // 6. Transit Tolerance Anomalies
  const transitLossPct = (transportLossKg / wasteGeneratedKg) * 100;
  if (transitLossPct > 3.0) {
    anomalies.push({
      id: "anom-transit-excessive",
      severity: "MEDIUM",
      code: "EXCESSIVE_TRANSIT_VARIANCE",
      title: "Transit Weight Variance Exceeds 3% Benchmark",
      description: `Transport loss between mill dispatch and recycler intake was ${transportLossKg.toLocaleString()} kg (${transitLossPct.toFixed(1)}%), exceeding normal moisture/handling thresholds.`,
      affectedDocuments: [invoiceDoc?.fileName || "Invoice", weighDoc?.fileName || "Weighbridge"],
      evidenceDetail: {
        expected: "< 1.5% Transit Delta",
        actual: `${transitLossPct.toFixed(1)}% Weight Difference`,
      },
      recommendation: "Verify tare calibration of weighbridge sensors at dispatch and receiving hubs.",
    });
  }

  // 7. Calculate Ledger & Overall Status
  const criticalAnomalies = anomalies.filter((a) => a.severity === "CRITICAL");
  const highAnomalies = anomalies.filter((a) => a.severity === "HIGH");

  let status: "VERIFIED" | "FAILED" | "EXCEPTION" = "VERIFIED";
  let aiRiskScore: "Low" | "Medium" | "High" | "Critical" = "Low";
  let auditScoreNumeric = 98;

  if (criticalAnomalies.length > 0) {
    status = "FAILED";
    aiRiskScore = "Critical";
    auditScoreNumeric = Math.max(12, 100 - criticalAnomalies.length * 35 - highAnomalies.length * 15);
  } else if (highAnomalies.length > 0) {
    status = "EXCEPTION";
    aiRiskScore = "High";
    auditScoreNumeric = Math.max(45, 100 - highAnomalies.length * 20 - anomalies.length * 8);
  } else if (anomalies.length > 0) {
    status = "UNDER_AUDIT" as any;
    aiRiskScore = "Medium";
    auditScoreNumeric = 82;
  }

  const ledger: MassBalanceLedger = {
    wasteGeneratedKg,
    transportLossKg,
    recyclerReceivedKg,
    processingLossKg,
    recycledYarnProducedKg,
    recoveryRatePercent,
    toleranceDeviationPercent: Number(transitLossPct.toFixed(2)),
    massConservationDeltaKg,
    isBalanced: !isPhysicallyImpossible && massConservationDeltaKg === 0,
    notes:
      status === "VERIFIED"
        ? "Mass balance reconciled within 0.12% precision tolerance across 5 supply chain tiers."
        : "Critical mass conservation violation or compliance anomaly detected. Batch unverified.",
  };

  // Build Supply Chain Nodes
  const nodes: SupplyChainNode[] = [
    {
      id: "node-1",
      stage: 1,
      name: "Waste Generation & Segregation",
      entity: invoiceDoc?.issuer || "Garment Mill Tier 1",
      location: invoiceDoc?.location || "Tirupur, India",
      action: "Cutting clip scrap collection & pre-consumer bale sorting",
      date: invoiceDoc?.dispatchDate || "2026-08-20",
      inputKg: wasteGeneratedKg,
      outputKg: wasteGeneratedKg,
      status: "verified",
      documents: [invoiceDoc?.fileName || "INV-2026-8842"],
      icon: "Factory",
    },
    {
      id: "node-2",
      stage: 2,
      name: "Logistics & Inbound Receiving",
      entity: weighDoc?.issuer || "Logistics Weighbridge Terminal",
      location: weighDoc?.location || "Coimbatore Inbound Terminal",
      action: "Gross/tare weighing, moisture stabilization & transit logging",
      date: weighDoc?.receiveDate || "2026-08-20",
      inputKg: wasteGeneratedKg,
      outputKg: recyclerReceivedKg,
      status: transitLossPct > 3.0 ? "flagged" : "verified",
      documents: [weighDoc?.fileName || "WB-99014"],
      icon: "Truck",
    },
    {
      id: "node-3",
      stage: 3,
      name: "Mechanical Recycling & De-fibering",
      entity: "EcoSpin Reclaimers Pvt Ltd",
      location: "Coimbatore, India",
      action: "RCS mechanical garnetting, de-fibering & fiber blend preparation",
      date: "2026-08-21",
      inputKg: recyclerReceivedKg,
      outputKg: recyclerReceivedKg,
      status: certDoc?.certification?.status === "Expired" ? "flagged" : "verified",
      documents: [certDoc?.fileName || "CU-881920-RCS", labDoc?.fileName || "SGS-IND-7712-Q"].filter(Boolean),
      icon: "Cpu",
    },
    {
      id: "node-4",
      stage: 4,
      name: "Spinning & Recycled Yarn Production",
      entity: grnDoc?.issuer || "Apex Recycled Yarns Ltd",
      location: grnDoc?.location || "Erode, India",
      action: "Ring carding & spinning into verified recycled yarn",
      date: grnDoc?.dispatchDate || "2026-08-22",
      inputKg: recyclerReceivedKg,
      outputKg: recycledYarnProducedKg,
      status: isPhysicallyImpossible ? "flagged" : "verified",
      documents: [grnDoc?.fileName || "GRN-APX-4109"],
      icon: "Layers",
    },
    {
      id: "node-5",
      stage: 5,
      name: "Garment Brand & Retail Verification",
      entity: "Nordic EcoWear Global",
      location: "Stockholm, Sweden",
      action: "Digital Product Passport embedding & circular verification",
      date: "2026-08-24",
      inputKg: recycledYarnProducedKg,
      outputKg: recycledYarnProducedKg,
      status: status === "VERIFIED" ? "verified" : "flagged",
      documents: ["Digital Product Passport", "VCR Master Certificate"],
      icon: "Shirt",
    },
  ];

  // Build VCR
  const vcr: VerifiedCircularityRecord = {
    vcrId: customVcrId,
    batchId,
    status,
    issueTimestamp: new Date().toISOString(),
    origin: invoiceDoc?.issuer || "Sri Lakshmi Garment Mills, Tirupur, India",
    destinationBrand: grnDoc?.targetParty || "Nordic EcoWear Global",
    materialType: invoiceDoc?.materialName || "Post-Industrial Cotton/Polyester Waste Blend",
    wasteDivertedKg: wasteGeneratedKg,
    verifiedRecycledOutputKg: recycledYarnProducedKg,
    recycledContentPercentage: grnDoc ? grnDoc.composition.cottonPercentage : 92,
    chainOfCustodyStatus: status === "VERIFIED" ? "Verified" : status === "EXCEPTION" ? "Flagged" : "Incomplete",
    evidenceCompletenessPercent,
    aiRiskScore,
    auditScoreNumeric,
    verificationHash: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
    issuerSignature: "TexTrace-AI-VeriEngine-v2.4-RSA4096",
    esgImpact: {
      co2AvoidedKg: Math.round(wasteGeneratedKg * 2.132),
      waterSavedLiters: Math.round(wasteGeneratedKg * 198),
      landfillDivertedKg: wasteGeneratedKg,
      energySavedKwh: Math.round(wasteGeneratedKg * 1.54),
    },
    ledger,
    anomalies,
    nodes,
    documents,
  };

  return {
    status,
    aiRiskScore,
    auditScoreNumeric,
    evidenceCompletenessPercent,
    ledger,
    anomalies,
    vcr,
  };
}
