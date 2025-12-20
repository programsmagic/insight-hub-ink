import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { toolRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { extractTextFromPdf } from "@/lib/tools/pdf-utils";
import { createGetHandler } from "@/lib/api-route-helpers";

export const runtime = "nodejs";
export const maxDuration = 30;

export const GET = createGetHandler(['POST']);

export async function POST(request: NextRequest) {
  try {
    const clientId = getClientIdentifier(request);
    const rateLimitResult = toolRateLimiter.check(clientId);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file || file.type !== "application/pdf") {
      return NextResponse.json({ error: "Please upload a valid PDF file" }, { status: 400 });
    }

    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "File is too large (max 50MB)" }, { status: 400 });
    }

    const pdfBytes = new Uint8Array(await file.arrayBuffer());
    const text = await extractTextFromPdf(pdfBytes);

    logger.info("PDF text extracted successfully", {
      textLength: text.length,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      text,
      note: "Note: Basic text extraction. For better results, consider using pdfjs-dist library.",
    });
  } catch (error) {
    logger.error("PDF to text error", error);
    return NextResponse.json(
      { error: "Failed to extract text from PDF. Please try again." },
      { status: 500 }
    );
  }
}




