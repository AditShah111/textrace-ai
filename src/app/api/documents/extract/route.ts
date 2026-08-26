import { NextRequest, NextResponse } from "next/server";
import { parseDocumentContent } from "@/lib/ai-parser";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, fileName, fileSize, mimeType } = body;

    if (!content && !fileName) {
      return NextResponse.json({ error: "Missing document content or filename" }, { status: 400 });
    }

    const extracted = await parseDocumentContent(
      content || fileName,
      fileName || "uploaded_document.pdf",
      fileSize || "1.2 MB",
      mimeType || "application/pdf"
    );

    return NextResponse.json({ success: true, document: extracted });
  } catch (error: any) {
    console.error("Extraction error:", error);
    return NextResponse.json({ error: error.message || "Failed to extract document" }, { status: 500 });
  }
}
