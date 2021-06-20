import client from './client';

export const listComments = (postId) => {
    return client.get(`/api/${postId}/comments`);
};

export const writeComment = ({ body, postId }) => {
    return client.post(`/api/${postId}/comments`, { body });
};

export const readComment = ({ postId, commentId }) => {
    return client.get(`/api/${postId}/comments/${commentId}`);
};

export const updateComment = ({ postId, commentId, body }) => {
    return client.patch(`/api/${postId}/comments/${commentId}`, { body });
};

export const removeComment = ({ postId, commentId }) => {
    return client.delete(`/api/${postId}/comments/${commentId}`);
}