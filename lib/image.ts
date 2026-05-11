// Image processing utilities optimized for ESP32 TFT displays
import sharp from 'sharp';

const DEFAULT_WIDTH = parseInt(process.env.DISPLAY_WIDTH || '320');
const DEFAULT_HEIGHT = parseInt(process.env.DISPLAY_HEIGHT || '240');
const DEFAULT_QUALITY = parseInt(process.env.IMAGE_QUALITY || '40');
const GRAYSCALE_MODE = process.env.GRAYSCALE_MODE !== 'false';

export interface ImageProcessOptions {
  width?: number;
  height?: number;
  quality?: number;
  grayscale?: boolean;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

/**
 * Process and compress image for ESP32 display
 * Optimized for low memory consumption and fast rendering
 */
export async function processImageForESP32(
  imageBuffer: Buffer,
  options: ImageProcessOptions = {}
): Promise<Buffer> {
  const {
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    quality = DEFAULT_QUALITY,
    grayscale = GRAYSCALE_MODE,
    fit = 'inside',
  } = options;

  try {
    let pipeline = sharp(imageBuffer)
      .resize(width, height, {
        fit,
        withoutEnlargement: false,
      });

    // Apply grayscale for manga mode (reduces file size significantly)
    if (grayscale) {
      pipeline = pipeline.grayscale();
    }

    // Convert to JPEG with aggressive compression
    const processed = await pipeline
      .jpeg({
        quality,
        progressive: false, // Sequential for faster ESP32 decoding
        mozjpeg: true, // Better compression
      })
      .toBuffer();

    return processed;
  } catch (error: any) {
    throw new Error(`Image processing failed: ${error.message}`);
  }
}

/**
 * Process cover image (thumbnail)
 * Smaller size for manga list views
 */
export async function processCoverImage(imageBuffer: Buffer): Promise<Buffer> {
  try {
    return await sharp(imageBuffer)
      .resize(120, 160, {
        fit: 'cover',
      })
      .jpeg({
        quality: 50,
        progressive: false,
      })
      .toBuffer();
  } catch (error: any) {
    throw new Error(`Cover processing failed: ${error.message}`);
  }
}

/**
 * Get image metadata without processing
 */
export async function getImageMetadata(imageBuffer: Buffer) {
  try {
    const metadata = await sharp(imageBuffer).metadata();
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      size: imageBuffer.length,
    };
  } catch (error: any) {
    throw new Error(`Failed to get image metadata: ${error.message}`);
  }
}
