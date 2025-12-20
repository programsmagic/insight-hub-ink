import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { toolRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { updatePdfMetadata } from "@/lib/tools/pdf-utils";
import { pdfMetadataSchema } from "@/lib/validation";
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
    const metadataJson = formData.get("metadata") as string;

    if (!file || file.type !== "application/pdf") {
      return NextResponse.json({ error: "Please upload a valid PDF file" }, { status: 400 });
    }

    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "File is too large (max 50MB)" }, { status: 400 });
    }

    let metadata;
    try {
      const parsed = JSON.parse(metadataJson);
      const validated = pdfMetadataSchema.parse(parsed);
      metadata = validated;
    } catch {
      return NextResponse.json({ error: "Invalid metadata format" }, { status: 400 });
    }

    const pdfBytes = new Uint8Array(await file.arrayBuffer());
    const updatedPdf = await updatePdfMetadata(pdfBytes, metadata);

    logger.info("PDF metadata updated successfully", {
      timestamp: new Date().toISOString(),
    });

    return new NextResponse(updatedPdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=document.pdf",
      },
    });
  } catch (error) {
    logger.error("PDF metadata error", error);
    return NextResponse.json(
      { error: "Failed to update PDF metadata. Please try again." },
      { status: 500 }
    );
  }
}




