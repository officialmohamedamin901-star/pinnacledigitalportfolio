export interface ProcessedImageResult {
  dataUrl: string; // High-res optimized image for main display
  thumbnailUrl: string; // Compact thumbnail for fast loading / listings
  width: number;
  height: number;
  originalSizeKb: number;
  optimizedSizeKb: number;
  fileName: string;
}

/**
 * Optimizes an uploaded image file on the client-side:
 * - Resizes large images to fit within max dimensions while preserving aspect ratio
 * - Compresses image to JPEG format with customizable quality
 * - Generates a small thumbnail URL automatically
 * - Returns exact dimensions and file size metrics
 */
export const processImageFile = (
  file: File,
  maxDimension = 1600,
  thumbDimension = 320
): Promise<ProcessedImageResult> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Selected file is not an image.'));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file from disk.'));

    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to parse image data.'));

      img.onload = () => {
        try {
          const origWidth = img.width;
          const origHeight = img.height;
          const originalSizeKb = Math.round(file.size / 1024);

          // 1. Calculate Main Image Dimensions (Preserve Aspect Ratio)
          let width = origWidth;
          let height = origHeight;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject(new Error('Canvas 2D context unavailable'));

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          const optimizedSizeKb = Math.round((dataUrl.length * 3) / 4 / 1024);

          // 2. Generate Compact Thumbnail
          let thumbWidth = origWidth;
          let thumbHeight = origHeight;
          if (thumbWidth > thumbDimension || thumbHeight > thumbDimension) {
            if (thumbWidth > thumbHeight) {
              thumbHeight = Math.round((thumbHeight * thumbDimension) / thumbWidth);
              thumbWidth = thumbDimension;
            } else {
              thumbWidth = Math.round((thumbWidth * thumbDimension) / thumbHeight);
              thumbHeight = thumbDimension;
            }
          }

          const thumbCanvas = document.createElement('canvas');
          thumbCanvas.width = thumbWidth;
          thumbCanvas.height = thumbHeight;
          const thumbCtx = thumbCanvas.getContext('2d');
          if (thumbCtx) {
            thumbCtx.imageSmoothingEnabled = true;
            thumbCtx.imageSmoothingQuality = 'medium';
            thumbCtx.drawImage(img, 0, 0, thumbWidth, thumbHeight);
          }

          const thumbnailUrl = thumbCanvas.toDataURL('image/jpeg', 0.72);

          resolve({
            dataUrl,
            thumbnailUrl,
            width,
            height,
            originalSizeKb,
            optimizedSizeKb,
            fileName: file.name
          });
        } catch (err) {
          reject(err);
        }
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
};
