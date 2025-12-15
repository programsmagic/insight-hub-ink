import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { toolRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { imagesToPdf } from "@/lib/tools/pdf-utils";

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

    const formData = await request.formData();
    const files = formData.getAll("images") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "Please upload at least one image file" },
        { status: 400 }
      );
    }

    // Validate and convert images
    const imageDataArray: Array<{ bytes: Uint8Array; format: "png" | "jpg" }> = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { error: `File ${file.name} is not an image` },
          { status: 400 }
        );
      }

      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: `File ${file.name} is too large (max 10MB)` },
          { status: 400 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const format = file.type === "image/png" ? "png" : "jpg";

      imageDataArray.push({ bytes, format });
    }

    const pdfBytes = await imagesToPdf(imageDataArray);

    logger.info("Images converted to PDF successfully", {
      imageCount: files.length,
      timestamp: new Date().toISOString(),
    });

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=images.pdf",
      },
    });
  } catch (error) {
    logger.error("Image to PDF error", error);
    return NextResponse.json(
      { error: "Failed to convert images to PDF. Please try again." },
      { status: 500 }
    );
  }
}


