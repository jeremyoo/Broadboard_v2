import client from './client';

// upload
export const upload = (data) =>
client.post('https://api.imgbb.com/1/upload?key=97a9f87e4f2534fae8fe2c5f2bbc8796', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });