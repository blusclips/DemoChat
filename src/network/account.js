import { axiosInstance } from './constant'
const date = Date.now() / 1000

async function loginUser(username) {  
  try {
      const user = await axiosInstance.post(`/users/login`, {username});
      return { success: true, data: user.data }
  } catch (error) {
     return { success: false }
  }
}

async function uploadImage(obj) {
   let localUri = obj.image;
   let filename = localUri.split('/').pop();
   let match = /\.(\w+)$/.exec(filename);
   let type = match ? `image/${match[1]}` : `image`;
   let formData = new FormData();
   formData.append('file' , { uri: localUri, name: filename, type });
   formData.append('upload_preset', 'mx3nvhft');
   formData.append('api_key', '964392392767388');
   formData.append('timestamp', `${date}`);
   return await fetch('https://api.cloudinary.com/v1_1/zonaster/image/upload', {
      method: 'POST',
      body: formData,
      header: {
         'content-type': 'multipart/form-data',
      }
   })
}

export {
   loginUser,
   uploadImage
}