import qs from 'qs';
import client from './client';

export const listProfile = ({ profile, tag, page }) => {
  const queryString = qs.stringify({
    profile, tag, page
  });
  return client.get(`/api/posts/profile?${queryString}`);
};
