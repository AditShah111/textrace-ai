import { RecyclingCredit, CreditLedgerTransaction, RetirementRecord } from "@/types/credits";

export let RECYCLING_CREDITS: RecyclingCredit[] = [
  {
    creditId: "TRC-2026-IND-TLM-8842",
    serialNumberRange: "#00001 - #08200",
    batchId: "BATCH-2026-IND-8842",
    vcrId: "TX-000184",
    materialType: "Pre-Consumer Combed Cotton/Poly Recycled Blend",
    fiberComposition: "78.4% Cotton / 21.6% PET",
    creditAmountKg: 8200,
    issuerEntity: "EcoSpin Reclaimers Pvt Ltd, Coimbatore",
    sourceMill: "Sri Lakshmi Garment Mills Ltd, Tirupur",
    mintTimestamp: "2026-08-22T18:15:00Z",
    status: "RETIRED",
    currentOwner: "Nordic EcoWear Global",
    retirementRecord: {
      certificateId: "CERT-RET-2026-9912",
      retiredBy: "Nordic EcoWear Global (Sustainability Dept)",
      beneficiaryBrand: "Nordic EcoWear Global",
      productLine: "Autumn/Winter 2026 Circular Jersey Line",
      orderReference: "PO #NW-4819-EU",
      retirementTimestamp: "2026-08-24T14:30:00Z",
      complianceMandate: "EU Digital Product Passport (DPP) & CSRD Scope 3 Circularity",
      proofHash: "0x9c4e12b7a9f8319e6231d87e0129af1832049b10924c918a24bf91490219aa43",
      verificationUrl: "/credits/certificate/CERT-RET-2026-9912",
      co2OffsetKg: 21320,
      waterSavedLiters: 1980000,
    },
    cryptographicSeal: {
      merkleRoot: "0x4f88129a012bc781293e",
      rsaSignature: "TexTrace-VeriEngine-RSA4096-Signed",
      sha256Hash: "0x8f2a9e33b5c7714902d8471c99fa68a35e2194b17c938d2f09d841e21b8c1992",
      auditorVerificationId: "AUDIT-PASS-TX-000184",
    },
  },
  {
    creditId: "TRC-2026-IND-TKH-8820",
    serialNumberRange: "#08201 - #21000",
    batchId: "BATCH-2026-IND-8820",
    vcrId: "TX-000183",
    materialType: "100% Recycled Cotton Jersey Scrap",
    fiberComposition: "100% Recycled Cotton",
    creditAmountKg: 12800,
    issuerEntity: "Tirupur Knit Hub Unit 4",
    sourceMill: "Tirupur Knitters Federation",
    mintTimestamp: "2026-08-18T15:00:00Z",
    status: "ACTIVE",
    currentOwner: "Patagonia Tier 2 Supplier",
    cryptographicSeal: {
      merkleRoot: "0x77a901f4412bc900122e",
      rsaSignature: "TexTrace-VeriEngine-RSA4096-Signed",
      sha256Hash: "0x441b8a1928019eaf192834b901298c1724018239019230192a83748291029384",
      auditorVerificationId: "AUDIT-PASS-TX-000183",
    },
  },
  {
    creditId: "TRC-2026-IND-SFR-8790",
    serialNumberRange: "#21001 - #38600",
    batchId: "BATCH-2026-IND-8790",
    vcrId: "TX-000182",
    materialType: "Post-Consumer Denim Scrap",
    fiberComposition: "98% Cotton / 2% Elastane",
    creditAmountKg: 17600,
    issuerEntity: "Surat Fiber Reclaimers",
    sourceMill: "Surat Textile Processing Zone",
    mintTimestamp: "2026-08-15T12:00:00Z",
    status: "ALLOCATED",
    currentOwner: "Nudie Jeans Co",
    cryptographicSeal: {
      merkleRoot: "0x91823abf109283719827",
      rsaSignature: "TexTrace-VeriEngine-RSA4096-Signed",
      sha256Hash: "0x3918203918203918203918203918203918203918203918203918203918203918",
      auditorVerificationId: "AUDIT-PASS-TX-000182",
    },
  },
];

export let LEDGER_TRANSACTIONS: CreditLedgerTransaction[] = [
  {
    txId: "TXN-0x8f2a9e01",
    timestamp: "2026-08-24T14:30:00Z",
    type: "RETIRE",
    creditId: "TRC-2026-IND-TLM-8842",
    quantityKg: 8200,
    fromParty: "Nordic EcoWear Global",
    toParty: "PERMANENT RETIREMENT / BURN (PO #NW-4819-EU)",
    proofHash: "0x9c4e12b7a9f8319e6231d87e0129af1832049b10924c918a24bf91490219aa43",
    notes: "Claimed on EU Digital Product Passport hangtags for Autumn/Winter 2026 Collection",
    status: "CONFIRMED",
  },
  {
    txId: "TXN-0x77b1029a",
    timestamp: "2026-08-23T10:15:00Z",
    type: "TRANSFER",
    creditId: "TRC-2026-IND-TLM-8842",
    quantityKg: 8200,
    fromParty: "EcoSpin Reclaimers Pvt Ltd",
    toParty: "Nordic EcoWear Global",
    proofHash: "0x129038af0192834b901293847102938471029384",
    notes: "B2B Credit Allocation against verified Purchase Agreement",
    status: "CONFIRMED",
  },
  {
    txId: "TXN-0x449012ab",
    timestamp: "2026-08-22T18:15:00Z",
    type: "MINT",
    creditId: "TRC-2026-IND-TLM-8842",
    quantityKg: 8200,
    fromParty: "TexTrace VeriEngine Protocol (Minter)",
    toParty: "EcoSpin Reclaimers Pvt Ltd (Recipient)",
    proofHash: "0x8f2a9e33b5c7714902d8471c99fa68a35e2194b17c938d2f09d841e21b8c1992",
    notes: "Minted from verified Batch BATCH-2026-IND-8842 (VCR: TX-000184) with 100% mass reconciliation",
    status: "CONFIRMED",
  },
  {
    txId: "TXN-0x11029384",
    timestamp: "2026-08-18T15:00:00Z",
    type: "MINT",
    creditId: "TRC-2026-IND-TKH-8820",
    quantityKg: 12800,
    fromParty: "TexTrace VeriEngine Protocol (Minter)",
    toParty: "Tirupur Knit Hub Unit 4",
    proofHash: "0x441b8a1928019eaf192834b901298c1724018239019230192a83748291029384",
    notes: "Minted from verified Batch BATCH-2026-IND-8820 with zero anomalies",
    status: "CONFIRMED",
  },
];

export function mintRecyclingCredits(params: {
  batchId: string;
  vcrId: string;
  materialType: string;
  fiberComposition: string;
  verifiedYieldKg: number;
  issuerEntity: string;
  sourceMill: string;
}): RecyclingCredit {
  const serialStart = RECYCLING_CREDITS.reduce((sum, c) => sum + c.creditAmountKg, 0) + 1;
  const serialEnd = serialStart + params.verifiedYieldKg - 1;
  const creditId = `TRC-2026-IND-${Math.floor(1000 + Math.random() * 9000)}`;

  const sha256Hash = "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("");

  const newCredit: RecyclingCredit = {
    creditId,
    serialNumberRange: `#${String(serialStart).padStart(5, "0")} - #${String(serialEnd).padStart(5, "0")}`,
    batchId: params.batchId,
    vcrId: params.vcrId,
    materialType: params.materialType,
    fiberComposition: params.fiberComposition,
    creditAmountKg: params.verifiedYieldKg,
    issuerEntity: params.issuerEntity,
    sourceMill: params.sourceMill,
    mintTimestamp: new Date().toISOString(),
    status: "ACTIVE",
    currentOwner: params.issuerEntity,
    cryptographicSeal: {
      merkleRoot: "0x" + Math.random().toString(36).substring(2, 12),
      rsaSignature: "TexTrace-VeriEngine-RSA4096-Signed",
      sha256Hash,
      auditorVerificationId: `AUDIT-PASS-${params.vcrId}`,
    },
  };

  RECYCLING_CREDITS = [newCredit, ...RECYCLING_CREDITS];

  // Record Transaction
  const tx: CreditLedgerTransaction = {
    txId: "TXN-0x" + Math.random().toString(36).substring(2, 10),
    timestamp: new Date().toISOString(),
    type: "MINT",
    creditId,
    quantityKg: params.verifiedYieldKg,
    fromParty: "TexTrace VeriEngine Protocol (Minter)",
    toParty: params.issuerEntity,
    proofHash: sha256Hash,
    notes: `Minted from verified Batch ${params.batchId} (${params.vcrId})`,
    status: "CONFIRMED",
  };

  LEDGER_TRANSACTIONS = [tx, ...LEDGER_TRANSACTIONS];

  return newCredit;
}

export function retireRecyclingCredit(params: {
  creditId: string;
  retiredBy: string;
  beneficiaryBrand: string;
  productLine: string;
  orderReference: string;
  complianceMandate: string;
}): RetirementRecord {
  const credit = RECYCLING_CREDITS.find((c) => c.creditId === params.creditId);
  if (!credit) {
    throw new Error(`Credit ${params.creditId} not found`);
  }

  if (credit.status === "RETIRED") {
    throw new Error(`Credit ${params.creditId} has already been retired / burned`);
  }

  const certificateId = `CERT-RET-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const proofHash = "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("");

  const retirementRecord: RetirementRecord = {
    certificateId,
    retiredBy: params.retiredBy,
    beneficiaryBrand: params.beneficiaryBrand,
    productLine: params.productLine,
    orderReference: params.orderReference,
    retirementTimestamp: new Date().toISOString(),
    complianceMandate: params.complianceMandate || "EU Digital Product Passport (DPP) & CSRD Scope 3",
    proofHash,
    verificationUrl: `/credits/certificate/${certificateId}`,
    co2OffsetKg: Math.round(credit.creditAmountKg * 2.132),
    waterSavedLiters: Math.round(credit.creditAmountKg * 198),
  };

  credit.status = "RETIRED";
  credit.retirementRecord = retirementRecord;

  // Add ledger transaction
  const tx: CreditLedgerTransaction = {
    txId: "TXN-0x" + Math.random().toString(36).substring(2, 10),
    timestamp: new Date().toISOString(),
    type: "RETIRE",
    creditId: credit.creditId,
    quantityKg: credit.creditAmountKg,
    fromParty: credit.currentOwner,
    toParty: `PERMANENT RETIREMENT / BURN (${params.orderReference})`,
    proofHash,
    notes: `Permanently retired for ${params.beneficiaryBrand} (${params.productLine}) to satisfy ${params.complianceMandate}`,
    status: "CONFIRMED",
  };

  LEDGER_TRANSACTIONS = [tx, ...LEDGER_TRANSACTIONS];

  return retirementRecord;
}
