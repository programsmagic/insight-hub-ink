import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { toolRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { getCloudinaryConfig, validateCloudinaryConfig } from "@/lib/cloudinary/config";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/tools/cloudinary/crop-resize/route.ts:10',message:'API route entry',data:{route:'/api/tools/cloudinary/crop-resize'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  try {
    const clientId = getClientIdentifier(request);
    if (!toolRateLimiter.check(clientId).allowed) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/tools/cloudinary/crop-resize/route.ts:13',message:'Rate limit exceeded',data:{clientId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const configValid = validateCloudinaryConfig();
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/tools/cloudinary/crop-resize/route.ts:17',message:'Cloudinary config validation',data:{isValid:configValid},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    if (!configValid) {
      return NextResponse.json({ error: "Cloudinary configuration is missing" }, { status: 500 });
    }

    // Configure Cloudinary only at runtime after validation
    const config = getCloudinaryConfig();
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/tools/cloudinary/crop-resize/route.ts:22',message:'Cloudinary config retrieved',data:{hasCloudName:!!config.cloudName,hasApiKey:!!config.apiKey,hasApiSecret:!!config.apiSecret},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    cloudinary.config({
      cloud_name: config.cloudName,
      api_key: config.apiKey,
      api_secret: config.apiSecret,
    });

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const optionsJson = formData.get("options") as string;
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/tools/cloudinary/crop-resize/route.ts:30',message:'File received',data:{hasFile:!!file,fileName:file?.name,fileType:file?.type,hasOptions:!!optionsJson},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion

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

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/tools/cloudinary/crop-resize/route.ts:49',message:'Before Cloudinary upload',data:{bufferSize:buffer.length,options},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
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
          if (error) {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/tools/cloudinary/crop-resize/route.ts:62',message:'Cloudinary upload error',data:{errorMessage:error.message,errorCode:error.http_code},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
            // #endregion
            reject(error);
          } else {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/tools/cloudinary/crop-resize/route.ts:64',message:'Cloudinary upload success',data:{hasResult:!!result,secureUrl:(result as any)?.secure_url},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
            // #endregion
            resolve(result);
          }
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
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/tools/cloudinary/crop-resize/route.ts:76',message:'Error caught',data:{errorMessage:error instanceof Error?error.message:String(error),errorStack:error instanceof Error?error.stack:undefined},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    logger.error("Cloudinary crop-resize error", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const isCloudinaryError = error && typeof error === "object" && "http_code" in error;
    return NextResponse.json(
      { 
        error: isCloudinaryError 
          ? "Cloudinary API error. Please check your configuration and try again."
          : "Failed to crop/resize image",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}


