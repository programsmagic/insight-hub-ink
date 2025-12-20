import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { toolRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { addWatermarkToPdf } from "@/lib/tools/pdf-utils";
import { pdfWatermarkSchema } from "@/lib/validation";
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
    const watermarkJson = formData.get("watermark") as string;

    if (!file || file.type !== "application/pdf") {
      return NextResponse.json({ error: "Please upload a valid PDF file" }, { status: 400 });
    }

    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "File is too large (max 50MB)" }, { status: 400 });
    }

    let watermark: { type: "text" | "image"; text?: string; imageBytes?: Uint8Array; opacity?: number };
    try {
      const parsed = JSON.parse(watermarkJson);
      const validated = pdfWatermarkSchema.parse(parsed);
      watermark = validated;

      // Handle image watermark
      if (watermark.type === "image") {
        const imageFile = formData.get("watermarkImage") as File;
        if (imageFile) {
          const imageBytes = new Uint8Array(await imageFile.arrayBuffer());
          watermark.imageBytes = imageBytes;
        } else {
          return NextResponse.json({ error: "Image watermark requires an image file" }, { status: 400 });
        }
      }
    } catch {
      return NextResponse.json({ error: "Invalid watermark format" }, { status: 400 });
    }

    const pdfBytes = new Uint8Array(await file.arrayBuffer());
    const watermarkedPdf = await addWatermarkToPdf(pdfBytes, watermark);

    logger.info("PDF watermarked successfully", {
      watermarkType: watermark.type,
      timestamp: new Date().toISOString(),
    });

    return new NextResponse(watermarkedPdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=watermarked.pdf",
      },
    });
  } catch (error) {
    logger.error("PDF watermark error", error);
    return NextResponse.json(
      { error: "Failed to add watermark. Please try again." },
      { status: 500 }
    );
  }
}


