import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { toolRateLimiter, getClientIdentifier } from "@/lib/rate-limit";
import { mergePdfs } from "@/lib/tools/pdf-utils";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/tools/pdf/merger/route.ts:9',message:'API route entry',data:{route:'/api/tools/pdf/merger'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimitResult = toolRateLimiter.check(clientId);
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/tools/pdf/merger/route.ts:13',message:'Rate limit check',data:{allowed:rateLimitResult.allowed,remaining:rateLimitResult.remaining},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
            "X-RateLimit-Limit": "20",
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": new Date(rateLimitResult.resetTime).toISOString(),
          },
        }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/tools/pdf/merger/route.ts:34',message:'Files received',data:{fileCount:files.length,fileNames:files.map(f=>f.name)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

    if (!files || files.length < 2) {
      return NextResponse.json(
        { error: "Please upload at least 2 PDF files to merge" },
        { status: 400 }
      );
    }

    // Validate all files are PDFs
    for (const file of files) {
      if (file.type !== "application/pdf") {
        return NextResponse.json(
          { error: `File ${file.name} is not a PDF` },
          { status: 400 }
        );
      }
      if (file.size > 50 * 1024 * 1024) {
        return NextResponse.json(
          { error: `File ${file.name} is too large (max 50MB)` },
          { status: 400 }
        );
      }
    }

    // Convert files to Uint8Array
    const pdfBytesArray: Uint8Array[] = [];
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      pdfBytesArray.push(new Uint8Array(arrayBuffer));
    }

    // Merge PDFs
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/tools/pdf/merger/route.ts:67',message:'Before mergePdfs call',data:{pdfCount:pdfBytesArray.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    const mergedPdf = await mergePdfs(pdfBytesArray);
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/tools/pdf/merger/route.ts:68',message:'After mergePdfs call',data:{mergedSize:mergedPdf.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

    logger.info("PDFs merged successfully", {
      fileCount: files.length,
      timestamp: new Date().toISOString(),
    });

    return new NextResponse(mergedPdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=merged.pdf",
        "X-RateLimit-Limit": "20",
        "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
        "X-RateLimit-Reset": new Date(rateLimitResult.resetTime).toISOString(),
      },
    });
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/tools/pdf/merger/route.ts:85',message:'Error caught',data:{errorMessage:error instanceof Error?error.message:String(error),errorStack:error instanceof Error?error.stack:undefined},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    logger.error("PDF merger error", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { 
        error: "Failed to merge PDFs. Please try again.",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}


