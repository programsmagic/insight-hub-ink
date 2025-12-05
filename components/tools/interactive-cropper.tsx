"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface InteractiveCropperProps {
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  onCropChange: (_crop: CropArea) => void;
  aspectRatio?: "free" | "1:1" | "16:9" | "4:3" | "3:2";
  disabled?: boolean;
}

export function InteractiveCropper({
  imageUrl,
  imageWidth,
  imageHeight,
  onCropChange,
  aspectRatio = "free",
  disabled = false,
}: InteractiveCropperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cropArea, setCrop] = useState<CropArea>({ x: 0, y: 0, width: 100, height: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragType, setDragType] = useState<"move" | "resize" | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState({ x: 1, y: 1 });

  // Calculate scale based on container size
  useEffect(() => {
    if (containerRef.current) {
      const updateSize = () => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect && imageWidth > 0 && imageHeight > 0) {
          const containerWidth = rect.width;
          const containerHeight = rect.height;
          const imageAspect = imageWidth / imageHeight;
          const containerAspect = containerWidth / containerHeight;

          let displayWidth: number;
          let displayHeight: number;

          if (imageAspect > containerAspect) {
            displayWidth = containerWidth;
            displayHeight = containerWidth / imageAspect;
          } else {
            displayHeight = containerHeight;
            displayWidth = containerHeight * imageAspect;
          }

          setContainerSize({ width: displayWidth, height: displayHeight });
          setScale({
            x: imageWidth / displayWidth,
            y: imageHeight / displayHeight,
          });
        }
      };

      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }
  }, [imageWidth, imageHeight]);

  // Calculate aspect ratio constraint
  const getAspectRatio = useCallback((): number | null => {
    switch (aspectRatio) {
      case "1:1":
        return 1;
      case "16:9":
        return 16 / 9;
      case "4:3":
        return 4 / 3;
      case "3:2":
        return 3 / 2;
      default:
        return null;
    }
  }, [aspectRatio]);

  // Constrain crop area to image bounds and aspect ratio
  const constrainCrop = useCallback(
    (newCrop: CropArea): CropArea => {
      const aspect = getAspectRatio();
      let { x, y, width, height } = newCrop;

      // Constrain to container bounds
      x = Math.max(0, Math.min(x, containerSize.width - width));
      y = Math.max(0, Math.min(y, containerSize.height - height));
      width = Math.max(20, Math.min(width, containerSize.width - x));
      height = Math.max(20, Math.min(height, containerSize.height - y));

      // Apply aspect ratio if needed
      if (aspect !== null) {
        if (width / height > aspect) {
          width = height * aspect;
        } else {
          height = width / aspect;
        }

        // Re-constrain position
        x = Math.max(0, Math.min(x, containerSize.width - width));
        y = Math.max(0, Math.min(y, containerSize.height - height));
      }

      return { x, y, width, height };
    },
    [containerSize, getAspectRatio]
  );

  // Convert display coordinates to image coordinates
  const toImageCoords = useCallback(
    (displayCrop: CropArea): CropArea => {
      return {
        x: Math.round(displayCrop.x * scale.x),
        y: Math.round(displayCrop.y * scale.y),
        width: Math.round(displayCrop.width * scale.x),
        height: Math.round(displayCrop.height * scale.y),
      };
    },
    [scale]
  );

  // Handle mouse/touch start
  const handleStart = useCallback(
    (clientX: number, clientY: number, type: "move" | "resize") => {
      if (disabled) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      setIsDragging(true);
      setDragStart({ x, y });
      setDragType(type);
    },
    [disabled]
  );

  // Handle mouse/touch move
  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging || !dragType || disabled) return;

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const currentX = clientX - rect.left;
      const currentY = clientY - rect.top;
      const deltaX = currentX - dragStart.x;
      const deltaY = currentY - dragStart.y;

      let newCrop = { ...cropArea };

      if (dragType === "move") {
        newCrop.x = cropArea.x + deltaX;
        newCrop.y = cropArea.y + deltaY;
      } else if (dragType === "resize") {
        newCrop.width = cropArea.width + deltaX;
        newCrop.height = cropArea.height + deltaY;
      }

      newCrop = constrainCrop(newCrop);
      setCrop(newCrop);
      onCropChange(toImageCoords(newCrop));
      setDragStart({ x: currentX, y: currentY });
    },
    [isDragging, dragType, dragStart, cropArea, constrainCrop, onCropChange, toImageCoords, disabled]
  );

  // Handle mouse/touch end
  const handleEnd = useCallback(() => {
    setIsDragging(false);
    setDragType(null);
  }, []);

  // Mouse events
  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
      const handleMouseUp = () => handleEnd();

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMove, handleEnd]);

  // Touch events
  useEffect(() => {
    if (isDragging) {
      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        if (touch) {
          handleMove(touch.clientX, touch.clientY);
        }
      };
      const handleTouchEnd = () => handleEnd();

      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);

      return () => {
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [isDragging, handleMove, handleEnd]);

  // Initialize crop area
  useEffect(() => {
    if (containerSize.width > 0 && containerSize.height > 0) {
      const initialCrop: CropArea = {
        x: containerSize.width * 0.1,
        y: containerSize.height * 0.1,
        width: containerSize.width * 0.8,
        height: containerSize.height * 0.8,
      };
      const constrained = constrainCrop(initialCrop);
      setCrop(constrained);
      onCropChange(toImageCoords(constrained));
    }
  }, [containerSize, constrainCrop, toImageCoords, onCropChange]);

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative border-2 border-dashed rounded-lg overflow-hidden bg-muted"
        style={{ minHeight: "400px", position: "relative" }}
      >
        <img
          src={imageUrl}
          alt="Crop preview"
          className="max-w-full max-h-full object-contain"
          style={{ display: "block", width: "100%", height: "auto" }}
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) ${(cropArea.x / containerSize.width) * 100}%, transparent ${(cropArea.x / containerSize.width) * 100}%, transparent ${((cropArea.x + cropArea.width) / containerSize.width) * 100}%, rgba(0,0,0,0.3) ${((cropArea.x + cropArea.width) / containerSize.width) * 100}%, rgba(0,0,0,0.3) 100%)`,
          }}
        >
          <div
            className="absolute border-2 border-white cursor-move"
            style={{
              left: `${cropArea.x}px`,
              top: `${cropArea.y}px`,
              width: `${cropArea.width}px`,
              height: `${cropArea.height}px`,
              boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.3)",
              pointerEvents: disabled ? "none" : "auto",
            }}
            onMouseDown={(e) => handleStart(e.clientX, e.clientY, "move")}
            onTouchStart={(e) => {
              const touch = e.touches[0];
              if (touch) {
                handleStart(touch.clientX, touch.clientY, "move");
              }
            }}
          >
            {/* Resize handle */}
            <div
              className="absolute bottom-0 right-0 w-4 h-4 bg-white border-2 border-blue-500 cursor-nwse-resize"
              style={{ transform: "translate(50%, 50%)" }}
              onMouseDown={(e) => {
                e.stopPropagation();
                handleStart(e.clientX, e.clientY, "resize");
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                const touch = e.touches[0];
                if (touch) {
                  handleStart(touch.clientX, touch.clientY, "resize");
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Crop info */}
      <div className="text-sm text-muted-foreground">
        Crop Area: {Math.round(cropArea.x * scale.x)} × {Math.round(cropArea.y * scale.y)} ({Math.round(cropArea.width * scale.x)} × {Math.round(cropArea.height * scale.y)})
      </div>
    </div>
  );
}

