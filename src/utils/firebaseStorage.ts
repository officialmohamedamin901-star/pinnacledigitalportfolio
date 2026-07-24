import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

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
 * Uploads an image (File or Blob or DataURL) to Firebase Storage with detailed step logging.
 * Returns the permanent public download URL.
 */
export async function uploadImageToStorage(
  imageInput: File | Blob | string,
  fileNamePrefix: string = 'portfolio_project'
): Promise<string> {
  let blob: Blob;
  let fileType = 'image/jpeg';

  if (typeof imageInput === 'string') {
    if (imageInput.startsWith('data:')) {
      console.log('[Storage Step 1/4] Converting optimized dataUrl to Blob...');
      blob = dataURLtoBlob(imageInput);
      fileType = blob.type;
    } else {
      // It is already an HTTP URL! Return as-is.
      console.log('[Storage Step 1/4] Image is already an external URL:', imageInput);
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

  console.log(`[Storage Step 1/4] Initializing upload for storage path: "${storagePath}" (Size: ${(blob.size / 1024).toFixed(2)} KB, Type: ${fileType})`);

  try {
    const storageRef = ref(storage, storagePath);

    console.log(`[Storage Step 2/4] Executing uploadBytes to Firebase Storage...`);
    const uploadResult = await uploadBytes(storageRef, blob, {
      contentType: fileType,
      customMetadata: {
        uploadedAt: new Date().toISOString()
      }
    });

    console.log(`[Storage Step 3/4] Bytes uploaded successfully: ${blob.size} bytes.`);

    console.log(`[Storage Step 4/4] Retrieving permanent public download URL from Firebase Storage...`);
    const downloadUrl = await getDownloadURL(uploadResult.ref);

    console.log(`[Storage Success] Image upload finished! Public Download URL: ${downloadUrl}`);
    return downloadUrl;
  } catch (err: any) {
    console.error(`[Storage Error] Firebase Storage upload failed for path "${storagePath}":`, err);
    throw new Error(err?.message || 'Firebase Storage upload failed.');
  }
}
