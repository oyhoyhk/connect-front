import client from './client';

export const requestChattingLogs = ({ sender, receiver, page }) =>
  client.get(
    `/api/chatting/logs?sender=${sender}&receiver=${receiver}&page=${page}`,
  );
