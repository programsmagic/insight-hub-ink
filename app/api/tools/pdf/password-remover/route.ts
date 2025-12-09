import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { toolRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { removePassword } from "@/lib/tools/pdf-utils";

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
    const password = formData.get("password") as string;

    if (!file || file.type !== "application/pdf") {
      return NextResponse.json({ error: "Please upload a valid PDF file" }, { status: 400 });
    }

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    const pdfBytes = new Uint8Array(await file.arrayBuffer());
    const unlockedPdf = await removePassword(pdfBytes, password);

    return new NextResponse(unlockedPdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=unlocked.pdf",
      },
    });
  } catch (error) {
    logger.error("PDF password remover error", error);
    return NextResponse.json({ error: "Failed to remove password. Invalid password or PDF is not encrypted." }, { status: 500 });
  }
}

