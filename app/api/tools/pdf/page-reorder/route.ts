import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { toolRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { reorderPdfPages } from "@/lib/tools/pdf-utils";
import { pdfReorderSchema } from "@/lib/validation";
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
    const newOrderJson = formData.get("newOrder") as string;

    if (!file || file.type !== "application/pdf") {
      return NextResponse.json({ error: "Please upload a valid PDF file" }, { status: 400 });
    }

    let newOrder;
    try {
      const parsed = JSON.parse(newOrderJson);
      const validated = pdfReorderSchema.parse({ newOrder: parsed });
      newOrder = validated.newOrder;
    } catch {
      return NextResponse.json({ error: "Invalid page order format" }, { status: 400 });
    }

    const pdfBytes = new Uint8Array(await file.arrayBuffer());
    const reorderedPdf = await reorderPdfPages(pdfBytes, newOrder);

    return new NextResponse(reorderedPdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=reordered.pdf",
      },
    });
  } catch (error) {
    logger.error("PDF reorder error", error);
    return NextResponse.json({ error: "Failed to reorder pages" }, { status: 500 });
  }
}




