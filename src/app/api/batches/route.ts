import { NextRequest, NextResponse } from "next/server";
import { CLEAN_VCR_RECORD } from "@/lib/sample-data";

const BATCHES = [
  CLEAN_VCR_RECORD,
  {
    ...CLEAN_VCR_RECORD,
    vcrId: "TX-000183",
    batchId: "BATCH-2026-IND-8820",
    issueTimestamp: "2026-08-18T14:20:00Z",
    materialType: "100% Recycled Pre-Consumer Cotton Jersey",
    wasteDivertedKg: 15400,
    verifiedRecycledOutputKg: 12800,
    destinationBrand: "Patagonia Tier 2 Supplier",
    auditScoreNumeric: 99,
  },
  {
    ...CLEAN_VCR_RECORD,
    vcrId: "TX-000182",
    batchId: "BATCH-2026-IND-8790",
    issueTimestamp: "2026-08-15T11:00:00Z",
    materialType: "Recycled Denim Post-Consumer Fiber",
    wasteDivertedKg: 22000,
    verifiedRecycledOutputKg: 17600,
    destinationBrand: "Nudie Jeans Co",
    auditScoreNumeric: 96,
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const vcrId = searchParams.get("vcrId");

  if (vcrId) {
    const found = BATCHES.find((b) => b.vcrId.toLowerCase() === vcrId.toLowerCase() || b.batchId.toLowerCase() === vcrId.toLowerCase());
    if (!found) {
      return NextResponse.json({ error: "Batch not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, batch: found });
  }

  return NextResponse.json({ success: true, batches: BATCHES });
}
