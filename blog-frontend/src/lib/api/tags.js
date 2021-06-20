import qs from 'qs';
import client from './client';

export const listTagsPosts = ({ tag, page }) => {
  const queryString = qs.stringify({ tag, page });
  return client.get(`/api/posts?${queryString}`);
};
