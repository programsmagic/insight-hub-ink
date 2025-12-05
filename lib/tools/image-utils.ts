/**
 * Image manipulation utilities using Canvas API
 */

/**
 * Convert image file to Base64 data URL
 */
export async function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert image to Base64"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

/**
 * Convert Base64 string to image blob
 */
export function base64ToBlob(base64: string, mimeType: string = "image/png"): Blob {
  const byteString = atob(base64.split(",")[1] || base64);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
}

/**
 * Get pixel color from image at specific coordinates
 */
export async function getPixelColor(
  imageUrl: string,
  x: number,
  y: number
): Promise<{ r: number; g: number; b: number; a: number; hex: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(x, y, 1, 1);
      const r = imageData.data[0] ?? 0;
      const g = imageData.data[1] ?? 0;
      const b = imageData.data[2] ?? 0;
      const a = imageData.data[3] ?? 255;
      const hex = `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
      resolve({ r, g, b, a, hex });
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageUrl;
  });
}

/**
 * Extract dominant colors from image
 */
export async function extractColorPalette(
  imageUrl: string,
  colorCount: number = 5
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      const colorMap = new Map<string, number>();

      // Sample pixels (every 10th pixel for performance)
      for (let i = 0; i < pixels.length; i += 40) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        if (r !== undefined && g !== undefined && b !== undefined) {
          const hex = `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
          colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
        }
      }

      // Sort by frequency and get top colors
      const sortedColors = Array.from(colorMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, colorCount)
        .map(([color]) => color);

      resolve(sortedColors);
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageUrl;
  });
}

/**
 * Resize image to specific dimensions
 */
export async function resizeImage(
  imageUrl: string,
  width: number,
  height: number,
  maintainAspectRatio: boolean = true
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let finalWidth = width;
      let finalHeight = height;

      if (maintainAspectRatio) {
        const aspectRatio = img.width / img.height;
        if (width / height > aspectRatio) {
          finalWidth = height * aspectRatio;
        } else {
          finalHeight = width / aspectRatio;
        }
      }

      canvas.width = finalWidth;
      canvas.height = finalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0, finalWidth, finalHeight);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageUrl;
  });
}

/**
 * Generate favicon sizes from image
 */
export async function generateFaviconSizes(imageUrl: string): Promise<{
  16: string;
  32: string;
  48: string;
  180: string;
}> {
  const sizes = [16, 32, 48, 180] as const;
  const results: Record<number, string> = {};

  for (const size of sizes) {
    const resized = await resizeImage(imageUrl, size, size, false);
    results[size] = resized;
  }

  const size16 = results[16];
  const size32 = results[32];
  const size48 = results[48];
  const size180 = results[180];

  if (!size16 || !size32 || !size48 || !size180) {
    throw new Error("Failed to generate all favicon sizes");
  }

  return {
    16: size16,
    32: size32,
    48: size48,
    180: size180,
  };
}

/**
 * Rotate image by degrees (90, 180, 270)
 */
export async function rotateImage(
  imageUrl: string,
  degrees: 90 | 180 | 270
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      // Swap dimensions for 90/270 degree rotations
      if (degrees === 90 || degrees === 270) {
        canvas.width = img.height;
        canvas.height = img.width;
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((degrees * Math.PI) / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);

      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageUrl;
  });
}

/**
 * Crop image to specific dimensions
 */
export async function cropImage(
  imageUrl: string,
  x: number,
  y: number,
  width: number,
  height: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageUrl;
  });
}

/**
 * Convert image format
 */
export async function convertImageFormat(
  imageUrl: string,
  format: "image/jpeg" | "image/png" | "image/webp",
  quality: number = 0.92
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      const mimeType = format;
      const output = canvas.toDataURL(mimeType, quality);
      resolve(output);
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageUrl;
  });
}

/**
 * Apply blur effect to image
 */
export async function applyBlur(imageUrl: string, blurAmount: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.filter = `blur(${blurAmount}px)`;
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageUrl;
  });
}

/**
 * Adjust brightness and contrast
 */
export async function adjustBrightnessContrast(
  imageUrl: string,
  brightness: number,
  contrast: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Apply brightness and contrast
      const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i] ?? 0;
        const g = data[i + 1] ?? 0;
        const b = data[i + 2] ?? 0;

        // Brightness
        const rBright = Math.min(255, Math.max(0, r + brightness));
        const gBright = Math.min(255, Math.max(0, g + brightness));
        const bBright = Math.min(255, Math.max(0, b + brightness));

        // Contrast
        data[i] = Math.min(255, Math.max(0, factor * (rBright - 128) + 128));
        data[i + 1] = Math.min(255, Math.max(0, factor * (gBright - 128) + 128));
        data[i + 2] = Math.min(255, Math.max(0, factor * (bBright - 128) + 128));
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageUrl;
  });
}

/**
 * Apply image filter
 */
export async function applyFilter(
  imageUrl: string,
  filter: "grayscale" | "sepia" | "invert" | "saturate" | "none"
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      const filters: Record<string, string> = {
        grayscale: "grayscale(100%)",
        sepia: "sepia(100%)",
        invert: "invert(100%)",
        saturate: "saturate(200%)",
        none: "none",
      };

      ctx.filter = filters[filter] || "none";
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageUrl;
  });
}

/**
 * Add watermark to image (text or image watermark)
 */
export async function addWatermark(
  imageUrl: string,
  options: {
    type: "text" | "image";
    text?: string;
    watermarkImageUrl?: string;
    position: "top-left" | "top-center" | "top-right" | "center-left" | "center" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right";
    opacity: number; // 0-1
    fontSize?: number;
    fontColor?: string;
    fontFamily?: string;
  }
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      // Draw base image
      ctx.drawImage(img, 0, 0);

      // Calculate watermark position
      const positions: Record<string, { x: number; y: number }> = {
        "top-left": { x: 20, y: 20 },
        "top-center": { x: canvas.width / 2, y: 20 },
        "top-right": { x: canvas.width - 20, y: 20 },
        "center-left": { x: 20, y: canvas.height / 2 },
        "center": { x: canvas.width / 2, y: canvas.height / 2 },
        "center-right": { x: canvas.width - 20, y: canvas.height / 2 },
        "bottom-left": { x: 20, y: canvas.height - 20 },
        "bottom-center": { x: canvas.width / 2, y: canvas.height - 20 },
        "bottom-right": { x: canvas.width - 20, y: canvas.height - 20 },
      };

      const pos = positions[options.position] || positions.center;

      if (options.type === "text" && options.text) {
        // Text watermark
        ctx.save();
        ctx.globalAlpha = options.opacity;
        ctx.font = `${options.fontSize || 24}px ${options.fontFamily || "Arial"}`;
        ctx.fillStyle = options.fontColor || "#FFFFFF";
        ctx.textAlign = options.position.includes("left") ? "left" : options.position.includes("right") ? "right" : "center";
        ctx.textBaseline = options.position.includes("top") ? "top" : options.position.includes("bottom") ? "bottom" : "middle";

        // Add text shadow for better visibility
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        ctx.fillText(options.text, pos.x, pos.y);
        ctx.restore();
      } else if (options.type === "image" && options.watermarkImageUrl) {
        // Image watermark
        const watermarkImg = new Image();
        watermarkImg.crossOrigin = "anonymous";
        watermarkImg.onload = () => {
          ctx.save();
          ctx.globalAlpha = options.opacity;

          // Calculate watermark size (20% of base image width)
          const maxWidth = canvas.width * 0.2;
          const maxHeight = canvas.height * 0.2;
          let watermarkWidth = watermarkImg.width;
          let watermarkHeight = watermarkImg.height;

          if (watermarkWidth > maxWidth) {
            watermarkHeight = (watermarkHeight * maxWidth) / watermarkWidth;
            watermarkWidth = maxWidth;
          }
          if (watermarkHeight > maxHeight) {
            watermarkWidth = (watermarkWidth * maxHeight) / watermarkHeight;
            watermarkHeight = maxHeight;
          }

          // Adjust position based on alignment
          let x = pos.x;
          let y = pos.y;

          if (options.position.includes("center") || options.position.includes("right")) {
            x -= watermarkWidth / 2;
          }
          if (options.position.includes("right")) {
            x = canvas.width - watermarkWidth - 20;
          }
          if (options.position.includes("center") || options.position.includes("bottom")) {
            y -= watermarkHeight / 2;
          }
          if (options.position.includes("bottom")) {
            y = canvas.height - watermarkHeight - 20;
          }

          ctx.drawImage(watermarkImg, x, y, watermarkWidth, watermarkHeight);
          ctx.restore();
          resolve(canvas.toDataURL("image/png"));
        };
        watermarkImg.onerror = () => reject(new Error("Failed to load watermark image"));
        watermarkImg.src = options.watermarkImageUrl;
        return;
      } else {
        reject(new Error("Invalid watermark options"));
        return;
      }

      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageUrl;
  });
}

/**
 * Apply advanced image filters with intensity control
 */
export async function applyAdvancedFilter(
  imageUrl: string,
  filter: "grayscale" | "sepia" | "invert" | "vintage" | "blackwhite" | "sharpen",
  intensity: number = 100 // 0-100
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const factor = intensity / 100;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i] ?? 0;
        const g = data[i + 1] ?? 0;
        const b = data[i + 2] ?? 0;
        const a = data[i + 3] ?? 255;

        let newR = r;
        let newG = g;
        let newB = b;

        switch (filter) {
          case "grayscale": {
            const gray = r * 0.299 + g * 0.587 + b * 0.114;
            newR = r + (gray - r) * factor;
            newG = g + (gray - g) * factor;
            newB = b + (gray - b) * factor;
            break;
          }
          case "sepia": {
            newR = Math.min(255, r * (1 - 0.607 * factor) + g * (0.769 * factor) + b * (0.189 * factor));
            newG = Math.min(255, r * (0.349 * factor) + g * (1 - 0.314 * factor) + b * (0.168 * factor));
            newB = Math.min(255, r * (0.272 * factor) + g * (0.534 * factor) + b * (1 - 0.869 * factor));
            break;
          }
          case "invert": {
            newR = r + (255 - r - r) * factor;
            newG = g + (255 - g - g) * factor;
            newB = b + (255 - b - b) * factor;
            break;
          }
          case "vintage": {
            // Vintage effect: slight sepia + reduced saturation
            const gray = r * 0.299 + g * 0.587 + b * 0.114;
            newR = Math.min(255, (r + gray * 0.3) * (1 - 0.2 * factor) + 20 * factor);
            newG = Math.min(255, (g + gray * 0.3) * (1 - 0.2 * factor) + 15 * factor);
            newB = Math.min(255, (b + gray * 0.3) * (1 - 0.2 * factor) + 10 * factor);
            break;
          }
          case "blackwhite": {
            const gray = r * 0.299 + g * 0.587 + b * 0.114;
            const threshold = 128;
            const bw = gray > threshold ? 255 : 0;
            newR = r + (bw - r) * factor;
            newG = g + (bw - g) * factor;
            newB = b + (bw - b) * factor;
            break;
          }
          case "sharpen": {
            // Simple sharpen: increase contrast at edges
            // This is a simplified version - full sharpen requires convolution
            const contrast = 1 + factor * 0.5;
            newR = Math.min(255, Math.max(0, (r - 128) * contrast + 128));
            newG = Math.min(255, Math.max(0, (g - 128) * contrast + 128));
            newB = Math.min(255, Math.max(0, (b - 128) * contrast + 128));
            break;
          }
        }

        data[i] = Math.min(255, Math.max(0, newR));
        data[i + 1] = Math.min(255, Math.max(0, newG));
        data[i + 2] = Math.min(255, Math.max(0, newB));
        data[i + 3] = a;
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageUrl;
  });
}

/**
 * Create collage from multiple images
 */
export async function createCollage(
  images: string[],
  options: {
    layout: "grid" | "horizontal" | "vertical" | "custom";
    gridColumns?: number;
    gridRows?: number;
    spacing?: number;
    backgroundColor?: string;
    imageSizes?: Array<{ width?: number; height?: number }>;
  }
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      // Load all images
      const loadedImages = await Promise.all(
        images.map(
          (url) =>
            new Promise<HTMLImageElement>((resolveImg, rejectImg) => {
              const img = new Image();
              img.crossOrigin = "anonymous";
              img.onload = () => resolveImg(img);
              img.onerror = () => rejectImg(new Error(`Failed to load image: ${url}`));
              img.src = url;
            })
        )
      );

      const spacing = options.spacing || 10;
      const backgroundColor = options.backgroundColor || "#FFFFFF";

      let canvas: HTMLCanvasElement;
      let ctx: CanvasRenderingContext2D;

      if (options.layout === "grid") {
        const cols = options.gridColumns || 2;
        const rows = options.gridRows || Math.ceil(loadedImages.length / cols);
        const cellWidth = 400;
        const cellHeight = 400;

        canvas = document.createElement("canvas");
        canvas.width = cols * cellWidth + (cols + 1) * spacing;
        canvas.height = rows * cellHeight + (rows + 1) * spacing;
        ctx = canvas.getContext("2d")!;

        // Fill background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw images in grid
        loadedImages.forEach((img, index) => {
          const col = index % cols;
          const row = Math.floor(index / cols);
          const x = col * (cellWidth + spacing) + spacing;
          const y = row * (cellHeight + spacing) + spacing;

          // Maintain aspect ratio
          const imgAspect = img.width / img.height;
          const cellAspect = cellWidth / cellHeight;
          let drawWidth = cellWidth;
          let drawHeight = cellHeight;
          let drawX = x;
          let drawY = y;

          if (imgAspect > cellAspect) {
            drawHeight = cellWidth / imgAspect;
            drawY = y + (cellHeight - drawHeight) / 2;
          } else {
            drawWidth = cellHeight * imgAspect;
            drawX = x + (cellWidth - drawWidth) / 2;
          }

          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        });
      } else if (options.layout === "horizontal") {
        const maxHeight = 400;
        let totalWidth = spacing;

        // Calculate total width
        loadedImages.forEach((img) => {
          const aspect = img.width / img.height;
          totalWidth += (maxHeight * aspect) + spacing;
        });

        canvas = document.createElement("canvas");
        canvas.width = totalWidth;
        canvas.height = maxHeight + spacing * 2;
        ctx = canvas.getContext("2d")!;

        // Fill background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw images horizontally
        let currentX = spacing;
        loadedImages.forEach((img) => {
          const aspect = img.width / img.height;
          const drawWidth = maxHeight * aspect;
          const drawHeight = maxHeight;
          ctx.drawImage(img, currentX, spacing, drawWidth, drawHeight);
          currentX += drawWidth + spacing;
        });
      } else if (options.layout === "vertical") {
        const maxWidth = 400;
        let totalHeight = spacing;

        // Calculate total height
        loadedImages.forEach((img) => {
          const aspect = img.width / img.height;
          totalHeight += (maxWidth / aspect) + spacing;
        });

        canvas = document.createElement("canvas");
        canvas.width = maxWidth + spacing * 2;
        canvas.height = totalHeight;
        ctx = canvas.getContext("2d")!;

        // Fill background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw images vertically
        let currentY = spacing;
        loadedImages.forEach((img) => {
          const aspect = img.width / img.height;
          const drawWidth = maxWidth;
          const drawHeight = maxWidth / aspect;
          ctx.drawImage(img, spacing, currentY, drawWidth, drawHeight);
          currentY += drawHeight + spacing;
        });
      } else {
        reject(new Error("Custom layout not yet implemented"));
        return;
      }

      resolve(canvas.toDataURL("image/png"));
    } catch (error) {
      reject(error);
    }
  });
}

