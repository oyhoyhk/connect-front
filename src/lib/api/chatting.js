import client from './client';

export const requestChattingLogs = ({ sender, receiver, page }) =>
  client.get(
    `/api/chatting/logs?sender=${sender}&receiver=${receiver}&page=${page}`,
  );

export const requestChattingList = ({ uid }) =>
  client.get(`/api/chatting/list?uid=${uid}`);
