import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  RefreshCw,
  Trash2,
  Check,
  Link as LinkIcon,
  AlertCircle,
  FileCheck,
  Loader2
} from 'lucide-react';
import { processImageFile, ProcessedImageResult } from '../utils/imageOptimizer';
import { uploadImageToStorage } from '../utils/firebaseStorage';

interface ImageUploaderProps {
  label?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  onChange: (imageUrl: string, thumbnailUrl?: string) => void;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'auto';
  helperText?: string;
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label = 'Project Image',
  imageUrl = '',
  thumbnailUrl = '',
  onChange,
  aspectRatio = 'video',
  helperText = 'Select an image file from your computer (PNG, JPG, WebP). Image will be automatically uploaded to permanent Storage.',
  className = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Determine aspect ratio class
  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'portrait':
        return 'aspect-[4/5]';
      case 'video':
        return 'aspect-video';
      default:
        return 'aspect-video';
    }
  };

  // Triggers file selection dialog
  const handleChooseFileClick = () => {
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  // File selected from computer -> Upload to Firebase Storage
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setIsProcessing(true);
    setProcessingStatus('Optimizing image...');

    console.log(`[ImageUploader Step 1/4] Selected image file: "${file.name}" (${(file.size / 1024).toFixed(1)} KB, type: ${file.type})`);

    try {
      // 1. Optimize image canvas
      const processed = await processImageFile(file);
      console.log(`[ImageUploader Step 2/4] Image optimized successfully (${processed.width}x${processed.height}px, ${processed.optimizedSizeKb} KB). Starting Firebase Storage upload...`);
      setProcessingStatus('Uploading to Firebase Storage...');

      // 2. Upload to permanent Storage and retrieve download URL
      const permanentUrl = await uploadImageToStorage(
        processed.dataUrl,
        label.toLowerCase().replace(/[^a-z0-9]/g, '_'),
        (pct) => {
          setProcessingStatus(`Uploading to Firebase Storage (${pct}%)...`);
        }
      );

      console.log(`[ImageUploader Step 3/4] Upload completed! Permanent Storage URL: ${permanentUrl}`);
      console.log(`[ImageUploader Step 4/4] Updating record with permanent Storage URL.`);

      setIsProcessing(false);
      setProcessingStatus('');
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);

      // Pass permanent URL to parent form
      onChange(permanentUrl, permanentUrl);
    } catch (err: any) {
      console.error('[ImageUploader Error] Image upload workflow failed:', err);
      setIsProcessing(false);
      setProcessingStatus('');
      setErrorMsg(err?.message || 'Firebase Storage upload failed. Keeping existing image intact.');
    }
  };

  // Remove Image Action
  const handleRemoveImage = () => {
    setErrorMsg(null);
    onChange('', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Manual URL Apply
  const handleApplyCustomUrl = () => {
    if (!customUrlInput.trim()) return;
    console.log('[ImageUploader] Custom URL applied manually:', customUrlInput.trim());
    onChange(customUrlInput.trim(), customUrlInput.trim());
    setShowUrlInput(false);
    setCustomUrlInput('');
  };

  const activeImage = imageUrl;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
        className="hidden"
      />

      {/* Label & Header */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-blue-400 hover:text-blue-300 font-mono flex items-center gap-1 transition-colors"
        >
          <LinkIcon size={12} />
          {showUrlInput ? 'Hide URL input' : 'Paste Image URL instead'}
        </button>
      </div>

      {/* Optional Direct URL Fallback */}
      {showUrlInput && (
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-white/10">
          <input
            type="url"
            value={customUrlInput}
            onChange={(e) => setCustomUrlInput(e.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
            className="flex-1 bg-transparent px-2 py-1 text-xs text-white placeholder-slate-500 border-0 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleApplyCustomUrl}
            className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold whitespace-nowrap cursor-pointer"
          >
            Apply URL
          </button>
        </div>
      )}

      {/* Error Banner showing Firebase errors */}
      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0 text-rose-400" />
          <span className="font-medium">{errorMsg}</span>
        </div>
      )}

      {/* Main Image Preview & Drop Area */}
      <div className="relative rounded-2xl bg-slate-950 border border-white/15 overflow-hidden group shadow-xl">
        {isProcessing ? (
          <div className={`w-full ${getAspectClass()} flex flex-col items-center justify-center bg-slate-900/90 text-white p-6 space-y-3`}>
            <Loader2 size={32} className="animate-spin text-blue-400" />
            <p className="text-xs font-bold text-blue-300">{processingStatus}</p>
            <p className="text-[11px] text-slate-400">Uploading to permanent Firebase Storage...</p>
          </div>
        ) : activeImage ? (
          <div className="relative w-full">
            {/* Image Preview Container maintaining proper aspect ratio & avoiding stretch */}
            <div className={`w-full ${getAspectClass()} overflow-hidden relative bg-black/60`}>
              <img
                src={activeImage}
                alt={label}
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-[1.02]"
              />
              {/* Soft Lighting Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Status Badge */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-900/90 text-emerald-400 border border-emerald-500/40 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                  <Check size={12} />
                  Permanent Storage Image
                </span>
              </div>
            </div>

            {/* Floating Action Controls Overlay */}
            <div className="p-3 bg-slate-900/95 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {/* Choose / Replace Image Button */}
                <button
                  type="button"
                  onClick={handleChooseFileClick}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition-all cursor-pointer"
                >
                  <RefreshCw size={14} className="text-blue-400" />
                  <span>Replace Image</span>
                </button>
              </div>

              {/* Remove Image Button */}
              <button
                type="button"
                onClick={handleRemoveImage}
                className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold flex items-center gap-1.5 border border-rose-500/30 transition-all cursor-pointer"
              >
                <Trash2 size={14} />
                <span>Remove Image</span>
              </button>
            </div>
          </div>
        ) : (
          /* Empty State - Choose Image */
          <div
            onClick={handleChooseFileClick}
            className="p-8 sm:p-12 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-white/[0.02] transition-all border-2 border-dashed border-white/15 hover:border-blue-500/50 rounded-2xl group"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-blue-400 transition-all shadow-lg">
              <ImageIcon size={26} />
            </div>

            <h5 className="text-sm font-bold text-white mb-1">
              Choose Image From Computer
            </h5>
            <p className="text-xs text-slate-400 max-w-xs mb-4 leading-relaxed">
              Click to select a local file. Image will be uploaded to Firebase Storage and saved permanently.
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleChooseFileClick();
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
              >
                <Upload size={15} />
                <span>Choose & Upload Image</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Success Notification */}
      {uploadSuccess && (
        <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 font-medium">
          <FileCheck size={16} />
          <span>Image uploaded & saved to permanent Storage!</span>
        </div>
      )}

      {/* Helper text */}
      <p className="text-[11px] text-slate-400 leading-normal">{helperText}</p>
    </div>
  );
};
