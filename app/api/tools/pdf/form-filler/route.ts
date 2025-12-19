import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { toolRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { fillPdfForm } from "@/lib/tools/pdf-utils";
import { pdfFormFillSchema } from "@/lib/validation";

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
    const formDataJson = formData.get("formData") as string;

    if (!file || file.type !== "application/pdf") {
      return NextResponse.json({ error: "Please upload a valid PDF file" }, { status: 400 });
    }

    let formFields;
    try {
      const parsed = JSON.parse(formDataJson);
      const validated = pdfFormFillSchema.parse({ formData: parsed });
      formFields = validated.formData;
    } catch {
      return NextResponse.json({ error: "Invalid form data format" }, { status: 400 });
    }

    const pdfBytes = new Uint8Array(await file.arrayBuffer());
    const filledPdf = await fillPdfForm(pdfBytes, formFields);

    return new NextResponse(filledPdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=filled-form.pdf",
      },
    });
  } catch (error) {
    logger.error("PDF form filler error", error);
    return NextResponse.json({ error: "Failed to fill PDF form" }, { status: 500 });
  }
}



