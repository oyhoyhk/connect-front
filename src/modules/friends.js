import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as friendsAPI from '../lib/api/friends';

const REMOVE_TAG_IN_FRONT = 'friends/REMOVE_TAG_IN_FRONT';
const ADD_TAG_IN_FRONT = 'friends/ADD_TAG_IN_FRONT';
const RECEIVE_MESSAGE = 'frends/RECEIVE_MESSAGE';
const FRIEND_REQUEST_ACCEPTED = 'friends/FRIEND_REQUEST_ACCEPTED';
const FRIEND_REQUEST_REFUSED = 'friends/FRIEND_REQUEST_REFUSED';
const SOMEONE_LOGIN = 'friends/SOMEONE_LOGIN';
const SOMEONE_LOGOUT = 'friends/SOMEONE_LOGOUT';
const ADD_MESSAGE_WHEN_FRIEND_REQUEST =
  'friends/ADD_MESSAGE_WHEN_FRIEND_REQUEST';
const [
  LOAD_FRIENDS_LIST,
  LOAD_FRIENDS_LIST_SUCCESS,
  LOAD_FRIENDS_LIST_FAILURE,
] = createRequestActionTypes('friends/SET_FRIENDS');
const [LOAD_TAGS, LOAD_TAGS_SUCCESS, LOAD_TAGS_FAILURE] =
  createRequestActionTypes('friends/SET_TAGS');
const [ADD_TAG, ADD_TAG_SUCCESS, ADD_TAG_FAILURE] =
  createRequestActionTypes('friends/ADD_TAG');
const [REMOVE_TAG, REMOVE_TAG_SUCCESS, REMOVE_TAG_FAILURE] =
  createRequestActionTypes('frineds/REMOVE_TAG');
const [GET_RECOMMEND, GET_RECOMMEND_SUCCESS, GET_RECOMMEND_FAILURE] =
  createRequestActionTypes('friends/GET_RECOMMEND');
const [FRIEND_REQUEST, FRIEND_REQUEST_SUCCESS, FRIEND_REQUEST_FAILURE] =
  createRequestActionTypes('friends/FRIEND_REQUEST');
const [
  REQUEST_FRIENDS_LIST,
  REQUEST_FRIENDS_LIST_SUCCESS,
  REQUEST_FRIENDS_LIST_FAILURE,
] = createRequestActionTypes('friends/REQUEST_FRIENDS_LIST');
const [
  REQUEST_MESSAGES_LIST,
  REQUEST_MESSAGES_LIST_SUCCESS,
  REQUEST_MESSAGES_LIST_FAILURE,
] = createRequestActionTypes('friends/REQUEST_MESSAGES_LIST');
const [
  ACCEPT_FRIEND_REQUEST,
  ACCEPT_FRIEND_REQUEST_SUCCESS,
  ACCEPT_FRIEND_REQUEST_FAILURE,
] = createRequestActionTypes('friends/ACCEPT_FRIEND_REQUEST');

const [
  REFUSE_FRIEND_REQUEST,
  REFUSE_FRIEND_REQUEST_SUCCESS,
  REFUSE_FRIEND_REQUEST_FAILURE,
] = createRequestActionTypes('friend/REFUSE_FRIEND_REQUEST');

const [
  CANCEL_FRIEND_REQUEST,
  CANCEL_FRIEND_REQUEST_SUCCESS,
  CANCEL_FRIEND_REQUEST_FAILURE,
] = createRequestActionTypes('friend/CANCEL_FRIEND_REQUEST');

export const loadTags = createAction(LOAD_TAGS);
export const addTag = createAction(ADD_TAG);
export const addTagInFront = createAction(ADD_TAG_IN_FRONT);
export const removeTag = createAction(REMOVE_TAG);
export const removeTagInFront = createAction(REMOVE_TAG_IN_FRONT);
export const getRecommend = createAction(GET_RECOMMEND);
export const friendRequest = createAction(FRIEND_REQUEST);
export const requestFriendsList = createAction(REQUEST_FRIENDS_LIST);
export const receiveMessage = createAction(RECEIVE_MESSAGE);
export const requestMessagesList = createAction(REQUEST_MESSAGES_LIST);
export const acceptFriendRequest = createAction(ACCEPT_FRIEND_REQUEST);
export const refuseFriendRequest = createAction(REFUSE_FRIEND_REQUEST);
export const friendRequestAccepted = createAction(FRIEND_REQUEST_ACCEPTED);
export const friendRequestRefused = createAction(FRIEND_REQUEST_REFUSED);
export const addMessageWhenFriendRequest = createAction(
  ADD_MESSAGE_WHEN_FRIEND_REQUEST,
);
export const cancelFriendRequest = createAction(CANCEL_FRIEND_REQUEST);
export const someoneLogin = createAction(SOMEONE_LOGIN);
export const someoneLogout = createAction(SOMEONE_LOGOUT);

const loadFriendsListSaga = createRequestSaga(LOAD_FRIENDS_LIST);
const loadTagsSaga = createRequestSaga(LOAD_TAGS, friendsAPI.loadTags);
const addTagSaga = createRequestSaga(ADD_TAG, friendsAPI.addTag);
const removeTagSaga = createRequestSaga(REMOVE_TAG, friendsAPI.removeTag);
const getRecommendSaga = createRequestSaga(
  GET_RECOMMEND,
  friendsAPI.getRecommend,
);
const friendRequestSaga = createRequestSaga(
  FRIEND_REQUEST,
  friendsAPI.friendRequest,
);
const requestFriendsListSaga = createRequestSaga(
  REQUEST_FRIENDS_LIST,
  friendsAPI.requestFriendsList,
);
const requestMessagesListSaga = createRequestSaga(
  REQUEST_MESSAGES_LIST,
  friendsAPI.requestMessagesList,
);
const acceptFriendRequestSaga = createRequestSaga(
  ACCEPT_FRIEND_REQUEST,
  friendsAPI.acceptFriendRequest,
);
const refuseFriendRequestSaga = createRequestSaga(
  REFUSE_FRIEND_REQUEST,
  friendsAPI.refuseFriendRequest,
);

export function* friendsSaga() {
  yield takeLatest(LOAD_FRIENDS_LIST, loadFriendsListSaga);
  yield takeLatest(LOAD_TAGS, loadTagsSaga);
  yield takeLatest(ADD_TAG, addTagSaga);
  yield takeLatest(REMOVE_TAG, removeTagSaga);
  yield takeLatest(GET_RECOMMEND, getRecommendSaga);
  yield takeLatest(FRIEND_REQUEST, friendRequestSaga);
  yield takeLatest(REQUEST_FRIENDS_LIST, requestFriendsListSaga);
  yield takeLatest(REQUEST_MESSAGES_LIST, requestMessagesListSaga);
  yield takeLatest(ACCEPT_FRIEND_REQUEST, acceptFriendRequestSaga);
  yield takeLatest(REFUSE_FRIEND_REQUEST, refuseFriendRequestSaga);
}

const initialState = {
  friendsList: [],
  tagList: '',
  error: null,
  recommendList: [],
  friendRequestList: [],
  messagesList: [],
};

export default handleActions(
  {
    [LOAD_TAGS_SUCCESS]: (state, { payload: tags }) => ({
      ...state,
      tagList: tags,
    }),
    [LOAD_TAGS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [LOAD_FRIENDS_LIST_SUCCESS]: (state, { payload: friendsList }) => ({
      ...state,
      friendsList: [...friendsList],
    }),
    [LOAD_FRIENDS_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [ADD_TAG_SUCCESS]: (state) => ({
      ...state,
    }),
    [ADD_TAG_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [ADD_TAG_IN_FRONT]: (state, { payload: tag }) => ({
      ...state,
      tagList: state.tagList + '_' + tag,
    }),
    [REMOVE_TAG_SUCCESS]: (state) => ({
      ...state,
    }),
    [REMOVE_TAG_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [REMOVE_TAG_IN_FRONT]: (state, { payload: tag }) => ({
      ...state,
      tagList: state.tagList
        .split('_')
        .filter((el) => el !== tag)
        .join('_'),
    }),
    [GET_RECOMMEND_SUCCESS]: (state, { payload: list }) => ({
      ...state,
      recommendList: [...list],
    }),
    [GET_RECOMMEND_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [FRIEND_REQUEST_SUCCESS]: (state, { payload: list }) => ({
      ...state,
      friendRequestList: [...list],
    }),
    [FRIEND_REQUEST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [REQUEST_FRIENDS_LIST_SUCCESS]: (state, { payload: friendsList }) => ({
      ...state,
      friendsList,
    }),
    [REQUEST_FRIENDS_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [RECEIVE_MESSAGE]: (state, { payload: data }) => ({
      ...state,
      messagesList: [...state.messagesList, { ...data }],
    }),
    [REQUEST_MESSAGES_LIST_SUCCESS]: (state, { payload: messagesList }) => {
      const result = messagesList.map((el) => {
        const info = JSON.parse(el.info);
        info.type = el.type;
        info.time = el.CREATED_AT.slice(2, 10).split('-').join('.');
        return info;
      });
      return {
        ...state,
        messagesList: [...result],
      };
    },
    [REQUEST_MESSAGES_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [ACCEPT_FRIEND_REQUEST_SUCCESS]: (
      state,
      { payload: { friendsList, messagesList } },
    ) => ({
      ...state,
      messagesList: [
        ...messagesList.map((message) => JSON.parse(message.SENDER_INFO)),
      ],
      friendsList: [...friendsList],
    }),
    [ACCEPT_FRIEND_REQUEST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [REFUSE_FRIEND_REQUEST_SUCCESS]: (state, { payload: messagesList }) => {
      const result = messagesList.map((message) => {
        message.info = JSON.parse(message.info);
        message.info.time = message.CREATED_AT.slice(0, 10)
          .split('-')
          .join('.');
        message.info.type = message.type;
        return message.info;
      });
      return {
        ...state,
        messagesList: [...result],
      };
    },
    [REFUSE_FRIEND_REQUEST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [FRIEND_REQUEST_ACCEPTED]: (state, { payload: info }) => ({
      ...state,
      friendsList: [...state.friendsList, info],
    }),
    [FRIEND_REQUEST_REFUSED]: (state, { payload: uid }) => {
      console.log(uid);
      return {
        ...state,
        messagesList: state.messagesList.filter((el) => el.uid !== uid),
      };
    },
    [ADD_MESSAGE_WHEN_FRIEND_REQUEST]: (state, { payload: receiver }) => ({
      ...state,
      messagesList: [{ ...receiver }, ...state.messagesList],
    }),
    [CANCEL_FRIEND_REQUEST_SUCCESS]: (state, { payload: messagesList }) => {
      const result = messagesList.map((el) => {
        const info = JSON.parse(el.info);
        info.type = el.type;
        info.time = el.CREATED_AT.slice(2, 10).split('-').join('.');
        return info;
      });
      return {
        ...state,
        messagesList: [...result],
      };
    },
    [CANCEL_FRIEND_REQUEST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [SOMEONE_LOGIN]: (state, { payload: uid }) => ({
      ...state,
      friendsList: state.friendsList.map((friend) =>
        friend.uid === uid ? { ...friend, status: true } : { ...friend },
      ),
    }),
    [SOMEONE_LOGOUT]: (state, { payload: uid }) => ({
      ...state,
      friendsList: state.friendsList.map((friend) =>
        friend.uid === uid ? { ...friend, status: false } : { ...friend },
      ),
    }),
  },
  initialState,
);
