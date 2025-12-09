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
    const optionsJson = formData.get("options") as string;

    if (!file || !file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Please upload a valid image file" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let options: any = {};
    if (optionsJson) {
      try {
        options = JSON.parse(optionsJson);
      } catch {
        return NextResponse.json({ error: "Invalid options format" }, { status: 400 });
      }
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          transformation: [
            {
              width: options.width,
              height: options.height,
              crop: options.crop || "fill",
              gravity: options.gravity || "auto",
            },
          ],
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
    logger.error("Cloudinary crop-resize error", error);
    return NextResponse.json({ error: "Failed to crop/resize image" }, { status: 500 });
  }
}

