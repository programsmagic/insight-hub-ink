import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { toolRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { splitPdf } from "@/lib/tools/pdf-utils";
import { z } from "zod";

export const runtime = "nodejs";
export const maxDuration = 30;

const splitPdfSchema = z.object({
  pageRanges: z.array(z.object({
    start: z.number().int().min(1),
    end: z.number().int().min(1),
  })),
});

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
    const pageRangesJson = formData.get("pageRanges") as string;

    if (!file || file.type !== "application/pdf") {
      return NextResponse.json({ error: "Please upload a valid PDF file" }, { status: 400 });
    }

    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "File is too large (max 50MB)" }, { status: 400 });
    }

    let pageRanges;
    try {
      const parsed = JSON.parse(pageRangesJson);
      const validated = splitPdfSchema.parse({ pageRanges: parsed });
      pageRanges = validated.pageRanges;
    } catch {
      return NextResponse.json({ error: "Invalid page ranges format" }, { status: 400 });
    }

    const pdfBytes = new Uint8Array(await file.arrayBuffer());
    const splitPdfs = await splitPdf(pdfBytes, pageRanges);

    // Return first split PDF (for multiple splits, would need to zip or return separately)
    if (splitPdfs.length === 0) {
      return NextResponse.json({ error: "No pages to extract" }, { status: 400 });
    }

    logger.info("PDF split successfully", {
      splits: splitPdfs.length,
      timestamp: new Date().toISOString(),
    });

    // For now, return the first split. In production, you might want to zip multiple splits
    return new NextResponse(splitPdfs[0], {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=split.pdf",
      },
    });
  } catch (error) {
    logger.error("PDF splitter error", error);
    return NextResponse.json(
      { error: "Failed to split PDF. Please try again." },
      { status: 500 }
    );
  }
}


