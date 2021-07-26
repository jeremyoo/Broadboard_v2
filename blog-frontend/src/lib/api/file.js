import client from './client';

// upload
export const upload = (data) =>
client.post('https://api.imgbb.com/1/upload?key=4ed496280b631f26287c9e731a03e155', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });