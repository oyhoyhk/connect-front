import io from 'socket.io-client';
import * as gv from '../../global_variables';

let uid = localStorage.user ? JSON.parse(localStorage.user).uid : null;
export const socket = io(gv.SOCKET_ADDRESS, {
  query: { uid },
  closeOnBeforeunload: false,
  cors: { origin: '*' },
});
