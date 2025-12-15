import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { toolRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { mergePdfs } from "@/lib/tools/pdf-utils";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimitResult = toolRateLimiter.check(clientId);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
            "X-RateLimit-Limit": "20",
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": new Date(rateLimitResult.resetTime).toISOString(),
          },
        }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length < 2) {
      return NextResponse.json(
        { error: "Please upload at least 2 PDF files to merge" },
        { status: 400 }
      );
    }

    // Validate all files are PDFs
    for (const file of files) {
      if (file.type !== "application/pdf") {
        return NextResponse.json(
          { error: `File ${file.name} is not a PDF` },
          { status: 400 }
        );
      }
      if (file.size > 50 * 1024 * 1024) {
        return NextResponse.json(
          { error: `File ${file.name} is too large (max 50MB)` },
          { status: 400 }
        );
      }
    }

    // Convert files to Uint8Array
    const pdfBytesArray: Uint8Array[] = [];
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      pdfBytesArray.push(new Uint8Array(arrayBuffer));
    }

    // Merge PDFs
    const mergedPdf = await mergePdfs(pdfBytesArray);

    logger.info("PDFs merged successfully", {
      fileCount: files.length,
      timestamp: new Date().toISOString(),
    });

    return new NextResponse(mergedPdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=merged.pdf",
        "X-RateLimit-Limit": "20",
        "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
        "X-RateLimit-Reset": new Date(rateLimitResult.resetTime).toISOString(),
      },
    });
  } catch (error) {
    logger.error("PDF merger error", error);
    return NextResponse.json(
      { error: "Failed to merge PDFs. Please try again." },
      { status: 500 }
    );
  }
}


