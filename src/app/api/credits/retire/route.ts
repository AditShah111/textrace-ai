import { NextRequest, NextResponse } from "next/server";
import { retireRecyclingCredit } from "@/lib/credit-registry";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const retirementRecord = retireRecyclingCredit(body);
    return NextResponse.json({ success: true, retirementRecord });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Retirement failed" }, { status: 400 });
  }
}
