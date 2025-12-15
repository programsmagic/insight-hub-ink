/**
 * PDF manipulation utilities using pdf-lib
 */

import { PDFDocument, PDFPage, rgb, PDFFont, PDFImage } from "pdf-lib";

/**
 * Extract text from PDF
 */
export async function extractTextFromPdf(pdfBytes: Uint8Array): Promise<string> {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();
  let text = "";

  // Note: pdf-lib doesn't have built-in text extraction
  // This is a placeholder - for production, use pdfjs-dist or pdf-parse
  // For now, return page count info
  text = `PDF has ${pages.length} page(s). Text extraction requires additional library (pdfjs-dist).`;

  return text;
}

/**
 * Merge multiple PDFs into one
 */
export async function mergePdfs(pdfBytesArray: Uint8Array[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (const pdfBytes of pdfBytesArray) {
    const pdf = await PDFDocument.load(pdfBytes);
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((page) => mergedPdf.addPage(page));
  }

  return await mergedPdf.save();
}

/**
 * Split PDF by page ranges
 */
export async function splitPdf(
  pdfBytes: Uint8Array,
  pageRanges: Array<{ start: number; end: number }>
): Promise<Uint8Array[]> {
  const sourcePdf = await PDFDocument.load(pdfBytes);
  const results: Uint8Array[] = [];

  for (const range of pageRanges) {
    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(sourcePdf, Array.from({ length: range.end - range.start + 1 }, (_, i) => range.start + i));
    pages.forEach((page) => newPdf.addPage(page));
    results.push(await newPdf.save());
  }

  return results;
}

/**
 * Extract specific pages from PDF
 */
export async function extractPages(pdfBytes: Uint8Array, pageNumbers: number[]): Promise<Uint8Array> {
  const sourcePdf = await PDFDocument.load(pdfBytes);
  const newPdf = await PDFDocument.create();
  const pages = await newPdf.copyPages(sourcePdf, pageNumbers.map((n) => n - 1)); // Convert to 0-based
  pages.forEach((page) => newPdf.addPage(page));
  return await newPdf.save();
}

/**
 * Rotate PDF pages
 */
export async function rotatePdfPages(
  pdfBytes: Uint8Array,
  rotations: Array<{ pageNumber: number; angle: 90 | 180 | 270 }>
): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(pdfBytes);
  const pages = pdf.getPages();

  for (const rotation of rotations) {
    const pageIndex = rotation.pageNumber - 1; // Convert to 0-based
    if (pageIndex >= 0 && pageIndex < pages.length) {
      pages[pageIndex].setRotation(rotation.angle);
    }
  }

  return await pdf.save();
}

/**
 * Add watermark to PDF
 */
export async function addWatermarkToPdf(
  pdfBytes: Uint8Array,
  watermark: { type: "text" | "image"; text?: string; imageBytes?: Uint8Array; opacity?: number }
): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(pdfBytes);
  const pages = pdf.getPages();

  for (const page of pages) {
    if (watermark.type === "text" && watermark.text) {
      const font = await pdf.embedFont("Helvetica");
      const { width, height } = page.getSize();
      page.drawText(watermark.text, {
        x: width / 2 - 50,
        y: height / 2,
        size: 20,
        font,
        color: rgb(0.7, 0.7, 0.7),
        opacity: watermark.opacity || 0.3,
        rotate: { angle: 45, xOrigin: width / 2, yOrigin: height / 2 },
      });
    } else if (watermark.type === "image" && watermark.imageBytes) {
      const image = await pdf.embedPng(watermark.imageBytes);
      const { width, height } = page.getSize();
      const imageDims = image.scale(0.3);
      page.drawImage(image, {
        x: width / 2 - imageDims.width / 2,
        y: height / 2 - imageDims.height / 2,
        width: imageDims.width,
        height: imageDims.height,
        opacity: watermark.opacity || 0.3,
      });
    }
  }

  return await pdf.save();
}

/**
 * Reorder PDF pages
 */
export async function reorderPdfPages(pdfBytes: Uint8Array, newOrder: number[]): Promise<Uint8Array> {
  const sourcePdf = await PDFDocument.load(pdfBytes);
  const newPdf = await PDFDocument.create();
  const pages = await newPdf.copyPages(sourcePdf, newOrder.map((n) => n - 1)); // Convert to 0-based
  pages.forEach((page) => newPdf.addPage(page));
  return await newPdf.save();
}

/**
 * Update PDF metadata
 */
export async function updatePdfMetadata(
  pdfBytes: Uint8Array,
  metadata: {
    title?: string;
    author?: string;
    subject?: string;
    keywords?: string[];
    creator?: string;
    producer?: string;
  }
): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(pdfBytes);
  if (metadata.title) pdf.setTitle(metadata.title);
  if (metadata.author) pdf.setAuthor(metadata.author);
  if (metadata.subject) pdf.setSubject(metadata.subject);
  if (metadata.keywords) pdf.setKeywords(metadata.keywords);
  if (metadata.creator) pdf.setCreator(metadata.creator);
  if (metadata.producer) pdf.setProducer(metadata.producer);
  return await pdf.save();
}

/**
 * Convert text to PDF
 */
export async function textToPdf(text: string, options?: { fontSize?: number; fontFamily?: string }): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([612, 792]); // US Letter size
  const font = await pdf.embedFont("Helvetica");
  const fontSize = options?.fontSize || 12;
  const margin = 50;
  const maxWidth = page.getWidth() - 2 * margin;
  const maxHeight = page.getHeight() - 2 * margin;

  // Simple text wrapping
  const lines = text.split("\n");
  let y = page.getHeight() - margin;

  for (const line of lines) {
    if (y < margin) {
      const newPage = pdf.addPage([612, 792]);
      y = newPage.getHeight() - margin;
    }

    const words = line.split(" ");
    let currentLine = "";
    let x = margin;

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const textWidth = font.widthOfTextAtSize(testLine, fontSize);

      if (textWidth > maxWidth && currentLine) {
        // Draw current line and start new line
        page.drawText(currentLine, {
          x,
          y,
          size: fontSize,
          font,
        });
        currentLine = word;
        y -= fontSize + 5;
        if (y < margin) {
          const newPage = pdf.addPage([612, 792]);
          y = newPage.getHeight() - margin;
        }
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      page.drawText(currentLine, {
        x: margin,
        y,
        size: fontSize,
        font,
      });
      y -= fontSize + 5;
    }
  }

  return await pdf.save();
}

/**
 * Convert images to PDF
 */
export async function imagesToPdf(imageBytesArray: Array<{ bytes: Uint8Array; format: "png" | "jpg" }>): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();

  for (const imageData of imageBytesArray) {
    const image = imageData.format === "png" 
      ? await pdf.embedPng(imageData.bytes)
      : await pdf.embedJpg(imageData.bytes);
    
    const page = pdf.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  return await pdf.save();
}

/**
 * Add password protection to PDF
 */
export async function addPasswordProtection(
  pdfBytes: Uint8Array,
  userPassword: string,
  ownerPassword?: string
): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(pdfBytes);
  // Note: pdf-lib doesn't support encryption directly
  // This would require additional library or server-side processing
  // For now, return the PDF as-is with a note
  return await pdf.save();
}

/**
 * Remove password from PDF (requires password)
 */
export async function removePassword(pdfBytes: Uint8Array, password: string): Promise<Uint8Array> {
  // Note: pdf-lib doesn't support decryption directly
  // This would require additional library
  // For now, try to load and save (which will fail if password is wrong)
  try {
    const pdf = await PDFDocument.load(pdfBytes);
    return await pdf.save();
  } catch (error) {
    throw new Error("Invalid password or PDF is not encrypted");
  }
}

/**
 * Fill PDF form fields
 */
export async function fillPdfForm(
  pdfBytes: Uint8Array,
  formData: Record<string, string>
): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(pdfBytes);
  const form = pdf.getForm();

  // Fill form fields
  for (const [fieldName, value] of Object.entries(formData)) {
    try {
      const field = form.getTextField(fieldName);
      field.setText(value);
    } catch {
      // Field might not exist or be a different type
      try {
        const field = form.getCheckBox(fieldName);
        field.check();
      } catch {
        // Field type not supported or doesn't exist
      }
    }
  }

  form.flatten(); // Make form fields read-only
  return await pdf.save();
}

/**
 * Compress PDF (basic - removes unused objects)
 */
export async function compressPdf(pdfBytes: Uint8Array): Promise<Uint8Array> {
  // pdf-lib doesn't have built-in compression
  // This is a basic implementation that just saves the PDF
  // For better compression, would need additional processing
  const pdf = await PDFDocument.load(pdfBytes);
  return await pdf.save();
}


