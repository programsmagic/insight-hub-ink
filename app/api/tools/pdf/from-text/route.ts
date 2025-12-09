import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { toolRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { textToPdf } from "@/lib/tools/pdf-utils";
import { textToPdfSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const maxDuration = 30;

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

    const body = await request.json();
    const validationResult = textToPdfSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { text, fontSize, fontFamily } = validationResult.data;
    const pdfBytes = await textToPdf(text, { fontSize, fontFamily });

    logger.info("Text converted to PDF successfully", {
      textLength: text.length,
      timestamp: new Date().toISOString(),
    });

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=document.pdf",
      },
    });
  } catch (error) {
    logger.error("Text to PDF error", error);
    return NextResponse.json(
      { error: "Failed to convert text to PDF. Please try again." },
      { status: 500 }
    );
  }
}

