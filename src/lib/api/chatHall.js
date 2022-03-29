import client from './client';

export const guestNumber = () => client.get('/api/chat_hall/guest_number');

export const userInfo = () => client.get('/api/chat_hall/user_info');

export const leaveChatHall = ({ username }) =>
  client.post('/api/chat_hall/leave', { username });
