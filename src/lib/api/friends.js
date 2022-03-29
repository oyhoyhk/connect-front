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
