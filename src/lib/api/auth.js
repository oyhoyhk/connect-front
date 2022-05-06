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

export const logout = (uid) => client.post('/api/auth/logout?uid=' + uid);

export const duplicateCheck = ({ username }) =>
  client.post('/api/auth/duplicate_check', { username });

export const modify = ({ formData }) =>
  client({
    url: '/api/auth/modify',
    method: 'post',
    data: formData,
    header: { 'Content-Type': 'multipart/form-data' },
  });
