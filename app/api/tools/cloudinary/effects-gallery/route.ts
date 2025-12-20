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
    const effectJson = formData.get("effect") as string;

    if (!file || !file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Please upload a valid image file" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let effect = {};
    if (effectJson) {
      try {
        effect = JSON.parse(effectJson);
      } catch {
        return NextResponse.json({ error: "Invalid effect format" }, { status: 400 });
      }
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          transformation: [effect],
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
    logger.error("Cloudinary effects error", error);
    return NextResponse.json({ error: "Failed to apply effect" }, { status: 500 });
  }
}


