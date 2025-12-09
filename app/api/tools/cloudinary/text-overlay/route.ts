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
    const text = formData.get("text") as string;
    const optionsJson = formData.get("options") as string;

    if (!file || !file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Please upload a valid image file" }, { status: 400 });
    }

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let options: any = {};
    if (optionsJson) {
      try {
        options = JSON.parse(optionsJson);
      } catch {
        // Use defaults
      }
    }

    // Upload image first
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    // Generate URL with text overlay
    const transformedUrl = cloudinary.url((uploadResult as any).public_id, {
      transformation: [
        {
          overlay: {
            font_family: options.fontFamily || "Arial",
            font_size: options.fontSize || 40,
            text: text,
          },
          color: options.color || "#FFFFFF",
          gravity: options.gravity || "south",
          y: options.y || 20,
          x: options.x || 0,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      url: transformedUrl,
      uploadResult,
    });
  } catch (error) {
    logger.error("Cloudinary text overlay error", error);
    return NextResponse.json({ error: "Failed to add text overlay" }, { status: 500 });
  }
}

