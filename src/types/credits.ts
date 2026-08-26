export type CreditStatus = 'ACTIVE' | 'ALLOCATED' | 'RETIRED';

export interface RetirementRecord {
  certificateId: string;
  retiredBy: string;
  beneficiaryBrand: string;
  productLine: string;
  orderReference: string;
  retirementTimestamp: string;
  complianceMandate: string; // e.g. "EU DPP & CSRD Scope 3 Textile Circularity"
  proofHash: string;
  verificationUrl: string;
  co2OffsetKg: number;
  waterSavedLiters: number;
}

export interface CryptographicSeal {
  merkleRoot: string;
  rsaSignature: string;
  sha256Hash: string;
  auditorVerificationId: string;
}

export interface RecyclingCredit {
  creditId: string;
  serialNumberRange: string;
  batchId: string;
  vcrId: string;
  materialType: string;
  fiberComposition: string;
  creditAmountKg: number;
  issuerEntity: string;
  sourceMill: string;
  mintTimestamp: string;
  status: CreditStatus;
  currentOwner: string;
  retirementRecord?: RetirementRecord;
  cryptographicSeal: CryptographicSeal;
}

export interface CreditLedgerTransaction {
  txId: string;
  timestamp: string;
  type: 'MINT' | 'TRANSFER' | 'RETIRE' | 'AUDIT_LOCK';
  creditId: string;
  quantityKg: number;
  fromParty: string;
  toParty: string;
  proofHash: string;
  notes: string;
  status: 'CONFIRMED';
}
