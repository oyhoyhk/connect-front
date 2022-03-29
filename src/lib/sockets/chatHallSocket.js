import io from 'socket.io-client';

let uid = localStorage.user ? JSON.parse(localStorage.user).uid : null;

export const socket = io('http://localhost:4000', { query: { uid } });
