import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { toolRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { addPasswordProtection } from "@/lib/tools/pdf-utils";
import { pdfPasswordSchema } from "@/lib/validation";
import { createGetHandler } from "@/lib/api-route-helpers";

export const runtime = "nodejs";
export const maxDuration = 30;

export const GET = createGetHandler(['POST']);

export async function POST(request: NextRequest) {
  try {
    const clientId = getClientIdentifier(request);
    const rateLimitResult = toolRateLimiter.check(clientId);

    if (!rateLimitResult.allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const passwordJson = formData.get("password") as string;

    if (!file || file.type !== "application/pdf") {
      return NextResponse.json({ error: "Please upload a valid PDF file" }, { status: 400 });
    }

    let passwordData;
    try {
      const parsed = JSON.parse(passwordJson);
      const validated = pdfPasswordSchema.parse(parsed);
      passwordData = validated;
    } catch {
      return NextResponse.json({ error: "Invalid password format" }, { status: 400 });
    }

    const pdfBytes = new Uint8Array(await file.arrayBuffer());
    const protectedPdf = await addPasswordProtection(
      pdfBytes,
      passwordData.userPassword,
      passwordData.ownerPassword
    );

    return new NextResponse(protectedPdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=protected.pdf",
      },
    });
  } catch (error) {
    logger.error("PDF password protect error", error);
    return NextResponse.json({ error: "Failed to add password protection" }, { status: 500 });
  }
}




