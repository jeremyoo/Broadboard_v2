import qs from 'qs';
import client from './client';

export const writePost = ({ title, banner, body, tags }) => {
  return client.post('/api/posts', { title, banner, body, tags });
}

export const readPost = (id) => client.get(`/api/posts/${id}`);

export const listPosts = (page) => {
  const queryString = qs.stringify(page);
  return client.get(`/api/posts?${queryString}`);
};

export const updatePost = ({ id, title, banner, body, tags }) => {
  return client.patch(`/api/posts/${id}`, { title, banner, body, tags });
};

export const removePost = (id) => client.delete(`/api/posts/${id}`);

export const likePost = ({ id, userId }) => {
  return client.patch(`/api/posts/${id}/like`, { userId });
}