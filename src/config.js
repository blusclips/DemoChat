import { Constants } from 'expo';

const extra = (Constants.manifest && Constants.manifest.extra) || {};

function required(value, name) {
  if (!value) {
    console.warn(`[config] Missing required value for ${name}. Set it via env before building.`);
  }
  return value || '';
}

export const API_URL = required(extra.apiUrl, 'API_URL');
export const CLOUDINARY_CLOUD_NAME = required(extra.cloudinaryCloudName, 'CLOUDINARY_CLOUD_NAME');
export const CLOUDINARY_UPLOAD_PRESET = required(extra.cloudinaryUploadPreset, 'CLOUDINARY_UPLOAD_PRESET');
export const CLOUDINARY_API_KEY = required(extra.cloudinaryApiKey, 'CLOUDINARY_API_KEY');
