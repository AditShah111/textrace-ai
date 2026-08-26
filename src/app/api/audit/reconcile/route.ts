import { NextRequest, NextResponse } from "next/server";
import { performMaterialAudit } from "@/lib/audit-engine";
import { ExtractedDocumentData } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { documents, batchId, vcrId } = body;

    if (!documents || !Array.isArray(documents) || documents.length === 0) {
      return NextResponse.json({ error: "Missing or empty documents array" }, { status: 400 });
    }

    const result = performMaterialAudit(
      documents as ExtractedDocumentData[],
      batchId || "BATCH-" + Math.floor(100000 + Math.random() * 900000),
      vcrId || "TX-000184"
    );

    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    console.error("Reconciliation error:", error);
    return NextResponse.json({ error: error.message || "Audit reconciliation failed" }, { status: 500 });
  }
}
