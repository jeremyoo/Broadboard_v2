import qs from 'qs';
import client from './client';

export const writePost = ({ title, body, tags }) =>
  client.post('/api/posts', { title, body, tags });

export const readPost = (id) => client.get(`/api/posts/${id}`);

export const listPosts = (page) => {
  const queryString = qs.stringify(page);
  console.log(queryString);
  return client.get(`/api/posts?${queryString}`);
};

export const updatePost = ({ id, title, body, tags }) =>
  client.patch(`/api/posts/${id}`, {
    title,
    body,
    tags,
  });

export const removePost = (id) => client.delete(`/api/posts/${id}`);

export const likePost = ({ id, userId }) =>
  client.patch(`/api/posts/${id}/like`, {
    userId,
  });