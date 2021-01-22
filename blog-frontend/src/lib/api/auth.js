import client from './client';

// log in
export const login = ({ username, password }) =>
client.post('/api/auth/login', { username, password });

// register
export const register = ({ username, password }) =>
client.post('/api/auth/register', { username, password });

// check log in
export const check = () => client.get('/api/auth/check');

// log out
export const logout = () => client.post('/api/auth/logout');