export type DocumentType =
  | 'lab_report'
  | 'mill_spec'
  | 'waste_invoice'
  | 'weighbridge_slip'
  | 'grn'
  | 'transport_slip'
  | 'recycling_certificate';

export type CertificateStandard = 'RCS' | 'GRS' | 'OEKO-TEX' | 'GOTS' | 'ISO 14021';

export type MaterialSource = 'pre-consumer' | 'post-industrial' | 'post-consumer';

export interface ExtractedFieldDetail {
  value: string | number | boolean;
  confidence: number;
  label: string;
  sourceDocSnippet?: string;
  isFlagged?: boolean;
}

export interface ExtractedDocumentData {
  id: string;
  documentType: DocumentType;
  fileName: string;
  fileSize: string;
  uploadTimestamp: string;
  issuer: string;
  targetParty: string;
  referenceNumber: string;
  materialName: string;
  quantityKg: number;
  composition: {
    cottonPercentage: number;
    polyesterPercentage: number;
    otherPercentage?: number;
    fiberDescription: string;
  };
  gsm?: number;
  yarnCount?: string;
  source: MaterialSource;
  certification?: {
    standard: CertificateStandard;
    certificateNumber: string;
    validFrom: string;
    validUntil: string;
    status: 'Valid' | 'Expired' | 'Suspended';
  };
  dispatchDate?: string;
  receiveDate?: string;
  location?: string;
  confidence: number;
  extractedFields: Record<string, ExtractedFieldDetail>;
  rawTextSnippet?: string;
}

export interface MassBalanceLedger {
  wasteGeneratedKg: number;
  transportLossKg: number;
  recyclerReceivedKg: number;
  processingLossKg: number;
  recycledYarnProducedKg: number;
  recoveryRatePercent: number;
  toleranceDeviationPercent: number;
  massConservationDeltaKg: number;
  isBalanced: boolean;
  notes: string;
}

export type AnomalySeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export interface AuditAnomaly {
  id: string;
  severity: AnomalySeverity;
  code: string;
  title: string;
  description: string;
  affectedDocuments: string[];
  evidenceDetail: {
    expected: string | number;
    actual: string | number;
    delta?: string | number;
  };
  recommendation: string;
}

export interface SupplyChainNode {
  id: string;
  stage: number;
  name: string;
  entity: string;
  location: string;
  action: string;
  date: string;
  inputKg: number;
  outputKg: number;
  status: 'verified' | 'flagged' | 'pending';
  documents: string[];
  icon: string;
}

export interface VerifiedCircularityRecord {
  vcrId: string;
  batchId: string;
  status: 'VERIFIED' | 'FAILED' | 'UNDER_AUDIT' | 'EXCEPTION';
  issueTimestamp: string;
  origin: string;
  destinationBrand: string;
  materialType: string;
  wasteDivertedKg: number;
  verifiedRecycledOutputKg: number;
  recycledContentPercentage: number;
  chainOfCustodyStatus: 'Verified' | 'Incomplete' | 'Flagged';
  evidenceCompletenessPercent: number;
  aiRiskScore: 'Low' | 'Medium' | 'High' | 'Critical';
  auditScoreNumeric: number;
  verificationHash: string;
  issuerSignature: string;
  esgImpact: {
    co2AvoidedKg: number;
    waterSavedLiters: number;
    landfillDivertedKg: number;
    energySavedKwh: number;
  };
  ledger: MassBalanceLedger;
  anomalies: AuditAnomaly[];
  nodes: SupplyChainNode[];
  documents: ExtractedDocumentData[];
}

export interface AuditScenario {
  id: string;
  name: string;
  badge: string;
  type: 'clean_pass' | 'fraud_fail' | 'custom_upload';
  description: string;
  wasteOrigin: string;
  brand: string;
  documents: ExtractedDocumentData[];
  expectedResult: 'PASS' | 'FAIL';
  anomaliesCount: number;
}
