import { axiosInstance } from './constant';
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from '../config';

const ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
const MAX_USERNAME_LENGTH = 64;
const MAX_PASSWORD_LENGTH = 128;

async function loginUser(username, password) {
  if (typeof username !== 'string' || !username.trim() || username.length > MAX_USERNAME_LENGTH) {
    return { success: false, error: 'Invalid username' };
  }
  if (typeof password !== 'string' || !password || password.length > MAX_PASSWORD_LENGTH) {
    return { success: false, error: 'Invalid password' };
  }
  try {
    const response = await axiosInstance.post('/users/login', {
      username: username.trim(),
      password,
    });
    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.error
      ? error.response.data.error
      : 'Login failed';
    return { success: false, error: message };
  }
}

async function uploadImage(obj) {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error('Image upload is not configured');
  }
  const localUri = obj.image;
  if (typeof localUri !== 'string' || !localUri) {
    throw new Error('Invalid image URI');
  }
  const filename = localUri.split('/').pop() || 'upload';
  const match = /\.(\w+)$/.exec(filename);
  const ext = match ? match[1].toLowerCase() : '';
  if (!ALLOWED_IMAGE_EXTENSIONS.includes(ext)) {
    throw new Error('Unsupported image type');
  }
  const type = `image/${ext}`;
  const formData = new FormData();
  formData.append('file', { uri: localUri, name: filename, type });
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  if (CLOUDINARY_API_KEY) {
    formData.append('api_key', CLOUDINARY_API_KEY);
  }
  formData.append('timestamp', `${Math.floor(Date.now() / 1000)}`);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );

  if (!response.ok) {
    throw new Error(`Image upload failed: ${response.status}`);
  }
  return response.json();
}

export { loginUser, uploadImage };
