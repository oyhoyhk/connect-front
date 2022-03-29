import client from './client';

export const login = ({ username, password }) =>
  client.post('/api/auth/login', { username, password });

export const register = ({ formData }) =>
  client({
    url: '/api/auth/register',
    method: 'post',
    data: formData,
    header: { 'Content-Type': 'multipart/form-data' },
  });
export const check = () => client.get('/api/auth/check');

export const logout = () => client.post('/api/auth/logout');

export const duplicateCheck = ({ username }) =>
  client.post('/api/auth/duplicate_check', { username });