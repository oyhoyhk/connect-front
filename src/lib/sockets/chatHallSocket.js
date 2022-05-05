import io from 'socket.io-client';

let uid = localStorage.user ? JSON.parse(localStorage.user).uid : null;
export const socket = io('http://13.125.200.108:4000', {
  query: { uid },
  closeOnBeforeunload: false,
  cors: { origin: '*' },
});
