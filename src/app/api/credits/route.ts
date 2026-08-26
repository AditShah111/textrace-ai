import { NextRequest, NextResponse } from "next/server";
import { RECYCLING_CREDITS, LEDGER_TRANSACTIONS, mintRecyclingCredits } from "@/lib/credit-registry";

export async function GET(req: NextRequest) {
  const totalMintedKg = RECYCLING_CREDITS.reduce((sum, c) => sum + c.creditAmountKg, 0);
  const activeKg = RECYCLING_CREDITS.filter((c) => c.status === "ACTIVE").reduce((sum, c) => sum + c.creditAmountKg, 0);
  const allocatedKg = RECYCLING_CREDITS.filter((c) => c.status === "ALLOCATED").reduce((sum, c) => sum + c.creditAmountKg, 0);
  const retiredKg = RECYCLING_CREDITS.filter((c) => c.status === "RETIRED").reduce((sum, c) => sum + c.creditAmountKg, 0);

  return NextResponse.json({
    success: true,
    balances: {
      totalMintedKg,
      activeKg,
      allocatedKg,
      retiredKg,
    },
    credits: RECYCLING_CREDITS,
    transactions: LEDGER_TRANSACTIONS,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newCredit = mintRecyclingCredits(body);
    return NextResponse.json({ success: true, credit: newCredit });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Minting failed" }, { status: 400 });
  }
}
