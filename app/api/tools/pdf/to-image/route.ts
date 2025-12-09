import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { toolRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { PDFDocument } from "pdf-lib";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const clientId = getClientIdentifier(request);
    const rateLimitResult = toolRateLimiter.check(clientId);

    if (!rateLimitResult.allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const pageNumber = formData.get("pageNumber") ? parseInt(formData.get("pageNumber") as string) : 1;

    if (!file || file.type !== "application/pdf") {
      return NextResponse.json({ error: "Please upload a valid PDF file" }, { status: 400 });
    }

    // Note: pdf-lib doesn't support rendering PDF to image
    // This would require pdfjs-dist or a server-side rendering solution
    // For now, return an error message
    return NextResponse.json({
      error: "PDF to Image conversion requires pdfjs-dist library. This feature is coming soon.",
      note: "Please use a dedicated PDF to image conversion tool or install pdfjs-dist for full support.",
    }, { status: 501 });
  } catch (error) {
    logger.error("PDF to image error", error);
    return NextResponse.json({ error: "Failed to convert PDF to image" }, { status: 500 });
  }
}

