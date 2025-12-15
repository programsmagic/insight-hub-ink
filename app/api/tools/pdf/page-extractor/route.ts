import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { toolRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { extractPages } from "@/lib/tools/pdf-utils";
import { z } from "zod";

export const runtime = "nodejs";
export const maxDuration = 30;

const extractPagesSchema = z.object({
  pageNumbers: z.array(z.number().int().min(1)),
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
    const pageNumbersJson = formData.get("pageNumbers") as string;

    if (!file || file.type !== "application/pdf") {
      return NextResponse.json({ error: "Please upload a valid PDF file" }, { status: 400 });
    }

    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "File is too large (max 50MB)" }, { status: 400 });
    }

    let pageNumbers;
    try {
      const parsed = JSON.parse(pageNumbersJson);
      const validated = extractPagesSchema.parse({ pageNumbers: parsed });
      pageNumbers = validated.pageNumbers;
    } catch {
      return NextResponse.json({ error: "Invalid page numbers format" }, { status: 400 });
    }

    if (pageNumbers.length === 0) {
      return NextResponse.json({ error: "Please specify at least one page to extract" }, { status: 400 });
    }

    const pdfBytes = new Uint8Array(await file.arrayBuffer());
    const extractedPdf = await extractPages(pdfBytes, pageNumbers);

    logger.info("PDF pages extracted successfully", {
      pageCount: pageNumbers.length,
      timestamp: new Date().toISOString(),
    });

    return new NextResponse(extractedPdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=extracted-pages.pdf",
      },
    });
  } catch (error) {
    logger.error("PDF page extractor error", error);
    return NextResponse.json(
      { error: "Failed to extract pages. Please try again." },
      { status: 500 }
    );
  }
}


