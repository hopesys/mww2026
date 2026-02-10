import imageCompression from 'browser-image-compression';
import { supabase } from './supabase';

const BUCKET = 'mwwt-uploads';
const MAX_SIZE_MB = 1;
const MAX_WIDTH_OR_HEIGHT = 1920;

export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith('image/')) return file;
  const options = {
    maxSizeMB: MAX_SIZE_MB,
    maxWidthOrHeight: MAX_WIDTH_OR_HEIGHT,
    useWebWorker: true,
  };
  return imageCompression(file, options);
}

/**
 * Upload file to Supabase Storage (mwwt-uploads).
 * Returns storage path for DB (use signed URL in admin to display).
 */
export async function uploadFile(
  file: File,
  folder: 'photos' | 'slips',
  prefix: string
): Promise<string> {
  const isImage = file.type.startsWith('image/');
  const toUpload = isImage ? await compressImage(file) : file;
  const ext = toUpload.name.split('.').pop() || 'bin';
  const path = `${folder}/${prefix}-${Date.now()}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, toUpload, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) throw error;
  return path;
}

/** Get a signed URL for viewing (e.g. in admin). Expires in 1 hour. */
export async function getSignedUrl(path: string): Promise<string> {
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, 3600);
  if (error) throw error;
  return data.signedUrl;
}
