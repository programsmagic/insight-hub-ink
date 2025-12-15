import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { toolRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { cloudinaryConfig, validateCloudinaryConfig } from "@/lib/cloudinary/config";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";
export const maxDuration = 60;

cloudinary.config({
  cloud_name: cloudinaryConfig.cloudName,
  api_key: cloudinaryConfig.apiKey,
  api_secret: cloudinaryConfig.apiSecret,
});

export async function POST(request: NextRequest) {
  try {
    const clientId = getClientIdentifier(request);
    if (!toolRateLimiter.check(clientId).allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    if (!validateCloudinaryConfig()) {
      return NextResponse.json({ error: "Cloudinary configuration is missing" }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const overlayFile = formData.get("overlay") as File;
    const optionsJson = formData.get("options") as string;

    if (!file || !file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Please upload a valid base image" }, { status: 400 });
    }

    if (!overlayFile || !overlayFile.type.startsWith("image/")) {
      return NextResponse.json({ error: "Please upload a valid overlay image" }, { status: 400 });
    }

    // Upload base image
    const baseArrayBuffer = await file.arrayBuffer();
    const baseBuffer = Buffer.from(baseArrayBuffer);

    const baseResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(baseBuffer);
    });

    // Upload overlay
    const overlayArrayBuffer = await overlayFile.arrayBuffer();
    const overlayBuffer = Buffer.from(overlayArrayBuffer);

    const overlayResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(overlayBuffer);
    });

    let options: any = {};
    if (optionsJson) {
      try {
        options = JSON.parse(optionsJson);
      } catch {
        // Use defaults
      }
    }

    // Apply overlay transformation
    const transformedUrl = cloudinary.url((baseResult as any).public_id, {
      transformation: [
        {
          overlay: (overlayResult as any).public_id,
          ...options,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      url: transformedUrl,
      baseImage: baseResult,
      overlayImage: overlayResult,
    });
  } catch (error) {
    logger.error("Cloudinary overlay error", error);
    return NextResponse.json({ error: "Failed to apply overlay" }, { status: 500 });
  }
}


