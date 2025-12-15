import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { toolRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { analyzePageSpeed } from "@/lib/tools/seo-utils";
import { z } from "zod";

export const runtime = "nodejs";
export const maxDuration = 60;

const pageSpeedSchema = z.object({
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
    const validationResult = pageSpeedSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { url } = validationResult.data;
    const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
    const result = await analyzePageSpeed(url, apiKey);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to analyze page speed" },
        { status: 400 }
      );
    }

    logger.info("Page speed analysis completed", {
      url,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    logger.error("Page speed analyzer error", error);
    return NextResponse.json(
      { error: "Failed to analyze page speed. Please try again." },
      { status: 500 }
    );
  }
}


