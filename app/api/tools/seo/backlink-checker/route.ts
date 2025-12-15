import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { toolRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { checkBacklinks } from "@/lib/tools/seo-utils";
import { z } from "zod";

export const runtime = "nodejs";
export const maxDuration = 30;

const backlinkCheckerSchema = z.object({
  url: z.string().url("Invalid URL format"),
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

    const body = await request.json();
    const validationResult = backlinkCheckerSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { url } = validationResult.data;
    const result = await checkBacklinks(url);

    logger.info("Backlink check completed", {
      url,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: result.success,
      message: result.message,
      note: result.note,
    });
  } catch (error) {
    logger.error("Backlink checker error", error);
    return NextResponse.json(
      { error: "Failed to check backlinks. Please try again." },
      { status: 500 }
    );
  }
}


