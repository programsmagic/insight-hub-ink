/**
 * EXIF metadata extraction utilities
 */

import EXIF from "exif-js";

export interface ImageMetadata {
  make?: string;
  model?: string;
  orientation?: number;
  dateTime?: string;
  dateTimeOriginal?: string;
  software?: string;
  artist?: string;
  copyright?: string;
  width?: number;
  height?: number;
  xResolution?: number;
  yResolution?: number;
  colorSpace?: number;
  compression?: number;
  exposureTime?: string;
  fNumber?: number;
  iso?: number;
  flash?: number;
  focalLength?: number;
  whiteBalance?: number;
  gps?: {
    latitude?: number;
    longitude?: number;
    altitude?: number;
  };
}

/**
 * Extract EXIF metadata from image file
 */
export function extractImageMetadata(file: File): Promise<ImageMetadata> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        EXIF.getData(img as any, function () {
          const metadata: ImageMetadata = {
            width: img.width,
            height: img.height,
          };

          // Basic EXIF data
          if (EXIF.getTag(img, "Make")) metadata.make = EXIF.getTag(img, "Make");
          if (EXIF.getTag(img, "Model")) metadata.model = EXIF.getTag(img, "Model");
          if (EXIF.getTag(img, "Orientation"))
            metadata.orientation = EXIF.getTag(img, "Orientation");
          if (EXIF.getTag(img, "DateTime"))
            metadata.dateTime = EXIF.getTag(img, "DateTime");
          if (EXIF.getTag(img, "DateTimeOriginal"))
            metadata.dateTimeOriginal = EXIF.getTag(img, "DateTimeOriginal");
          if (EXIF.getTag(img, "Software"))
            metadata.software = EXIF.getTag(img, "Software");
          if (EXIF.getTag(img, "Artist")) metadata.artist = EXIF.getTag(img, "Artist");
          if (EXIF.getTag(img, "Copyright"))
            metadata.copyright = EXIF.getTag(img, "Copyright");

          // Image properties
          if (EXIF.getTag(img, "PixelXDimension"))
            metadata.width = EXIF.getTag(img, "PixelXDimension");
          if (EXIF.getTag(img, "PixelYDimension"))
            metadata.height = EXIF.getTag(img, "PixelYDimension");
          if (EXIF.getTag(img, "XResolution"))
            metadata.xResolution = EXIF.getTag(img, "XResolution");
          if (EXIF.getTag(img, "YResolution"))
            metadata.yResolution = EXIF.getTag(img, "YResolution");
          if (EXIF.getTag(img, "ColorSpace"))
            metadata.colorSpace = EXIF.getTag(img, "ColorSpace");
          if (EXIF.getTag(img, "Compression"))
            metadata.compression = EXIF.getTag(img, "Compression");

          // Camera settings
          if (EXIF.getTag(img, "ExposureTime"))
            metadata.exposureTime = EXIF.getTag(img, "ExposureTime");
          if (EXIF.getTag(img, "FNumber")) metadata.fNumber = EXIF.getTag(img, "FNumber");
          if (EXIF.getTag(img, "ISOSpeedRatings"))
            metadata.iso = EXIF.getTag(img, "ISOSpeedRatings");
          if (EXIF.getTag(img, "Flash")) metadata.flash = EXIF.getTag(img, "Flash");
          if (EXIF.getTag(img, "FocalLength"))
            metadata.focalLength = EXIF.getTag(img, "FocalLength");
          if (EXIF.getTag(img, "WhiteBalance"))
            metadata.whiteBalance = EXIF.getTag(img, "WhiteBalance");

          // GPS data
          const lat = EXIF.getTag(img, "GPSLatitude");
          const lon = EXIF.getTag(img, "GPSLongitude");
          const alt = EXIF.getTag(img, "GPSAltitude");
          if (lat && Array.isArray(lat) && lon && Array.isArray(lon)) {
            metadata.gps = {
              latitude: convertDMSToDD(lat),
              longitude: convertDMSToDD(lon),
              altitude: alt && typeof alt === "number" ? alt : undefined,
            };
          }

          resolve(metadata);
        });
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = imageUrl;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

/**
 * Convert DMS (Degrees, Minutes, Seconds) to Decimal Degrees
 */
function convertDMSToDD(dms: number[]): number {
  const d = dms[0] ?? 0;
  const m = dms[1] ?? 0;
  const s = dms[2] ?? 0;
  return d + m / 60 + s / (60 * 60);
}

/**
 * Format metadata as readable string
 */
export function formatMetadata(metadata: ImageMetadata): string {
  const lines: string[] = [];

  if (metadata.make || metadata.model) {
    lines.push(`Camera: ${[metadata.make, metadata.model].filter(Boolean).join(" ")}`);
  }

  if (metadata.width && metadata.height) {
    lines.push(`Dimensions: ${metadata.width} × ${metadata.height} pixels`);
  }

  if (metadata.dateTimeOriginal || metadata.dateTime) {
    lines.push(`Date: ${metadata.dateTimeOriginal || metadata.dateTime}`);
  }

  if (metadata.exposureTime) {
    lines.push(`Exposure: ${metadata.exposureTime}s`);
  }

  if (metadata.fNumber) {
    lines.push(`Aperture: f/${metadata.fNumber}`);
  }

  if (metadata.iso) {
    lines.push(`ISO: ${metadata.iso}`);
  }

  if (metadata.focalLength) {
    lines.push(`Focal Length: ${metadata.focalLength}mm`);
  }

  if (metadata.software) {
    lines.push(`Software: ${metadata.software}`);
  }

  if (metadata.artist) {
    lines.push(`Artist: ${metadata.artist}`);
  }

  if (metadata.copyright) {
    lines.push(`Copyright: ${metadata.copyright}`);
  }

  if (metadata.gps) {
    lines.push(
      `Location: ${metadata.gps.latitude?.toFixed(6)}, ${metadata.gps.longitude?.toFixed(6)}`
    );
    if (metadata.gps.altitude) {
      lines.push(`Altitude: ${metadata.gps.altitude}m`);
    }
  }

  return lines.join("\n");
}

