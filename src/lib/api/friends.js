import client from './client';

export const loadTags = (uid) => client.get(`/api/friends/tags/${uid}`);
export const addTag = ({ tags, uid }) =>
  client.post('/api/friends/tags', { tags, uid });

export const removeTag = ({ tags, uid }) =>
  client.patch('/api/friends/tags', { tags, uid });

export const getRecommend = ({ filter, uid }) =>
  client.get(`/api/friends/recommend?uid=${uid}&filter=${filter}`);

export const friendRequest = ({ sender, receiver }) =>
  client.post('/api/friends/request', { sender, receiver });

export const requestFriendsList = ({ uid }) =>
  client.get(`/api/friends/friends_list?uid=${uid}`);

export const requestFriendRequestList = ({ uid }) =>
  client.get(`/api/friends/friend_request_list?uid=${uid}`);

export const requestMessagesList = ({ uid }) =>
  client.get(`/api/friends/messages?uid=${uid}`);

export const acceptFriendRequest = ({ sender, receiver }) =>
  client.post('/api/friends/messages', { sender, receiver });

export const refuseFriendRequest = ({ sender, receiver, type }) =>
  client.delete(
    `/api/friends/messages?sender=${sender}&receiver=${receiver}&type=${type}`,
  );

export const blockUser = ({ uid, other, tags }) =>
  client.post('/api/friends/block', { uid, other, tags });

export const deleteFriend = ({ uid, fuid }) =>
  client.delete(`/api/friends/friends?uid=${uid}&fuid=${fuid}`);
