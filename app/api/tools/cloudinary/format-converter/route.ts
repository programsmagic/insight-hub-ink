import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { toolRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { getCloudinaryConfig, validateCloudinaryConfig } from "@/lib/cloudinary/config";
import { v2 as cloudinary } from "cloudinary";
import { createGetHandler } from "@/lib/api-route-helpers";

export const runtime = "nodejs";
export const maxDuration = 60;

export const GET = createGetHandler(['POST']);

export async function POST(request: NextRequest) {
  try {
    const clientId = getClientIdentifier(request);
    if (!toolRateLimiter.check(clientId).allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    if (!validateCloudinaryConfig()) {
      return NextResponse.json({ error: "Cloudinary configuration is missing" }, { status: 500 });
    }

    // Configure Cloudinary only at runtime after validation
    const config = getCloudinaryConfig();
    cloudinary.config({
      cloud_name: config.cloudName,
      api_key: config.apiKey,
      api_secret: config.apiSecret,
    });

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const format = formData.get("format") as string;

    if (!file || !file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Please upload a valid image file" }, { status: 400 });
    }

    if (!format || !["jpg", "png", "webp", "avif", "gif"].includes(format)) {
      return NextResponse.json({ error: "Invalid format. Use: jpg, png, webp, avif, or gif" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          transformation: [{ format }],
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      data: uploadResult,
      url: (uploadResult as any).secure_url,
    });
  } catch (error) {
    logger.error("Cloudinary format converter error", error);
    return NextResponse.json({ error: "Failed to convert format" }, { status: 500 });
  }
}


