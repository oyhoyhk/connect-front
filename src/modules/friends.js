import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as friendsAPI from '../lib/api/friends';

const REMOVE_TAG_IN_FRONT = 'friends/REMOVE_TAG_IN_FRONT';
const ADD_TAG_IN_FRONT = 'friends/ADD_TAG_IN_FRONT';
const RECEIVE_MESSAGE = 'frends/RECEIVE_MESSAGE';
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
] = createRequestActionTypes('friends/REQUST_FRIENDS_LIST');

export const loadTags = createAction(LOAD_TAGS);
export const addTag = createAction(ADD_TAG);
export const addTagInFront = createAction(ADD_TAG_IN_FRONT);
export const removeTag = createAction(REMOVE_TAG);
export const removeTagInFront = createAction(REMOVE_TAG_IN_FRONT);
export const getRecommend = createAction(GET_RECOMMEND);
export const friendRequest = createAction(FRIEND_REQUEST);
export const requestFriendsList = createAction(REQUEST_FRIENDS_LIST);
export const receiveMessage = createAction(RECEIVE_MESSAGE);

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
export function* friendsSaga() {
  yield takeLatest(LOAD_FRIENDS_LIST, loadFriendsListSaga);
  yield takeLatest(LOAD_TAGS, loadTagsSaga);
  yield takeLatest(ADD_TAG, addTagSaga);
  yield takeLatest(REMOVE_TAG, removeTagSaga);
  yield takeLatest(GET_RECOMMEND, getRecommendSaga);
  yield takeLatest(FRIEND_REQUEST, friendRequestSaga);
  yield takeLatest(REQUEST_FRIENDS_LIST, requestFriendsListSaga);
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
    [ADD_TAG_IN_FRONT]: (state, { payload: tag }) => {
      console.log(tag);
      return {
        ...state,
        tagList: state.tagList + '_' + tag,
      };
    },
    [REMOVE_TAG_SUCCESS]: (state) => ({
      ...state,
    }),
    [REMOVE_TAG_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [REMOVE_TAG_IN_FRONT]: (state, { payload: tag }) => {
      console.log(tag);
      return {
        ...state,
        tagList: state.tagList
          .split('_')
          .filter((el) => el !== tag)
          .join('_'),
      };
    },
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
      messagesList: [...state.messagesList, data],
    }),
  },
  initialState,
);
