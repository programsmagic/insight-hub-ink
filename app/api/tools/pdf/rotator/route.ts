import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { toolRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { rotatePdfPages } from "@/lib/tools/pdf-utils";
import { pdfRotateSchema } from "@/lib/validation";
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
    const rotationsJson = formData.get("rotations") as string;

    if (!file || file.type !== "application/pdf") {
      return NextResponse.json({ error: "Please upload a valid PDF file" }, { status: 400 });
    }

    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "File is too large (max 50MB)" }, { status: 400 });
    }

    let rotations;
    try {
      const parsed = JSON.parse(rotationsJson);
      const validated = pdfRotateSchema.parse({ rotations: parsed });
      rotations = validated.rotations;
    } catch (error) {
      logger.warn("PDF rotator validation error", { error, parsed: rotationsJson });
      return NextResponse.json(
        { 
          error: "Invalid rotations format",
          details: process.env.NODE_ENV === "development" && error instanceof Error ? error.message : undefined
        },
        { status: 400 }
      );
    }

    const pdfBytes = new Uint8Array(await file.arrayBuffer());
    const rotatedPdf = await rotatePdfPages(pdfBytes, rotations);

    logger.info("PDF rotated successfully", {
      rotationsCount: rotations.length,
      timestamp: new Date().toISOString(),
    });

    return new NextResponse(rotatedPdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=rotated.pdf",
      },
    });
  } catch (error) {
    logger.error("PDF rotator error", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { 
        error: "Failed to rotate PDF. Please try again.",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}


