import { supabase } from '../supabase';

/**
 * Converts a base64 Data URL to a Blob for clean storage uploading.
 */
export function dataURLtoBlob(dataurl: string): Blob {
  const arr = dataurl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * Uploads an image (File or Blob or DataURL) to Supabase Storage with detailed step logging and progress tracking.
 * Returns the permanent public download URL.
 */
export async function uploadImageToStorage(
  imageInput: File | Blob | string,
  fileNamePrefix: string = 'portfolio_project',
  onProgress?: (progressPercent: number) => void
): Promise<string> {
  let blob: Blob;
  let fileType = 'image/jpeg';

  if (typeof imageInput === 'string') {
    if (imageInput.startsWith('data:')) {
      console.log('[Supabase Storage Step 1/4] Converting dataUrl to Blob...');
      blob = dataURLtoBlob(imageInput);
      fileType = blob.type;
    } else {
      // Already an external URL, skip upload
      console.log('[Supabase Storage Step 1/4] Image is already an external URL, skipping upload:', imageInput);
      if (onProgress) onProgress(100);
      return imageInput;
    }
  } else {
    blob = imageInput;
    if (imageInput.type) {
      fileType = imageInput.type;
    }
  }

  const timestamp = Date.now();
  const safePrefix = fileNamePrefix.replace(/[^a-zA-Z0-9_-]/g, '_');
  const storagePath = `uploads/projects/${safePrefix}_${timestamp}.jpg`;

  console.log(`[Supabase Storage Step 1/4] Initializing upload for path: "${storagePath}" (Size: ${(blob.size / 1024).toFixed(2)} KB, Type: ${fileType})`);
  if (onProgress) onProgress(15);

  try {
    const bucketName = 'portfolio-images';
    console.log(`[Supabase Storage Step 2/4] Uploading to bucket "${bucketName}"...`);
    if (onProgress) onProgress(40);

    let { data, error } = await supabase.storage
      .from(bucketName)
      .upload(storagePath, blob, {
        contentType: fileType,
        upsert: true
      });

    let activeBucket = bucketName;

    if (error) {
      console.warn(`[Supabase Storage Notice] Upload to '${bucketName}' failed: ${error.message}. Attempting fallback bucket 'uploads'...`);
      activeBucket = 'uploads';
      const fallbackRes = await supabase.storage
        .from(activeBucket)
        .upload(storagePath, blob, {
          contentType: fileType,
          upsert: true
        });

      if (fallbackRes.error) {
        console.error(`[Supabase Storage Error] Fallback upload failed:`, fallbackRes.error);
        throw new Error(`Supabase Storage Upload Error: ${fallbackRes.error.message || error.message}`);
      }
      data = fallbackRes.data;
    }

    if (onProgress) onProgress(80);
    console.log(`[Supabase Storage Step 3/4] Bytes uploaded successfully.`);

    console.log(`[Supabase Storage Step 4/4] Retrieving public URL from Supabase Storage...`);
    const { data: publicUrlData } = supabase.storage.from(activeBucket).getPublicUrl(storagePath);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      throw new Error('Failed to retrieve public URL from Supabase Storage.');
    }

    if (onProgress) onProgress(100);
    console.log(`[Supabase Storage Success] Image upload finished! Public URL: ${publicUrlData.publicUrl}`);

    return publicUrlData.publicUrl;
  } catch (err: any) {
    console.error(`[Supabase Storage Error] Upload failed for path "${storagePath}":`, err);
    throw new Error(err?.message || 'Supabase Storage upload failed.');
  }
}
