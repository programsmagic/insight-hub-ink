import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { toolRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { checkRedirects } from "@/lib/tools/seo-utils";
import { z } from "zod";

export const runtime = "nodejs";
export const maxDuration = 30;

const redirectCheckerSchema = z.object({
  url: z.string().url("Invalid URL format"),
  maxRedirects: z.number().int().min(1).max(20).optional().default(10),
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
    const validationResult = redirectCheckerSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { url, maxRedirects } = validationResult.data;
    const redirectInfo = await checkRedirects(url, maxRedirects);

    logger.info("Redirect check completed", {
      url,
      isRedirect: redirectInfo.isRedirect,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      data: redirectInfo,
    });
  } catch (error) {
    logger.error("Redirect checker error", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to check redirects. Please try again.",
      },
      { status: 500 }
    );
  }
}

