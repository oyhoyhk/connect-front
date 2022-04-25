import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as chatHallAPI from '../lib/api/chatHall';

const [GET_GUEST_NUMBER, GET_GUEST_NUMBER_SUCCESS, GET_GUEST_NUMBER_FAILURE] =
  createRequestActionTypes('chatHall/GET_GUEST_NUMBER');
const [GET_USER_INFO, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAILURE] =
  createRequestActionTypes('chatHall/GET_USER_INFO');
const LEAVE_CHAT_HALL = 'chatHall/LEAVE_CHAT_HALL';

const SET_CHAT_HALL = 'chatHall/SET_CHAT_HALL';
const SEND_MESSAGE = 'chatHall/SEND_MESSAGE';
const RECEIVE_MESSAGE = 'chatHall/RECEIVE_MESSAGE';
const SET_USER_LIST = 'chatHall/SET_USER_LIST';
const SOMEONE_LEFT = 'chatHall/SOMEHONE_LEFT';
const SOMEONE_IN_OUT = 'chatHall/SOMEONE_IN_OUT';
const INITIALIZE_CHAT_HALL = 'chathall/INITIALIZE_CHAT_HALL';

export const getGuestNumber = createAction(GET_GUEST_NUMBER);
export const setChatHall = createAction(SET_CHAT_HALL);
export const sendMessage = createAction(SEND_MESSAGE);
export const receiveMessage = createAction(RECEIVE_MESSAGE);
export const setUserList = createAction(SET_USER_LIST);
export const getUserInfo = createAction(GET_USER_INFO);
export const leaveChatHall = createAction(LEAVE_CHAT_HALL);
export const someoneLeft = createAction(SOMEONE_LEFT);
export const someoneInOut = createAction(SOMEONE_IN_OUT);
export const initializeChatHall = createAction(INITIALIZE_CHAT_HALL);

const getGuestNumberSaga = createRequestSaga(
  GET_GUEST_NUMBER,
  chatHallAPI.guestNumber,
);
const getUserInfoSaga = createRequestSaga(GET_USER_INFO, chatHallAPI.userInfo);

export function* chatHallSaga() {
  yield takeLatest(GET_GUEST_NUMBER, getGuestNumberSaga);
  yield takeLatest(GET_USER_INFO, getUserInfoSaga);
}
const initialState = {
  user: null,
  userList: [],
  msgList: [],
  error: null,
};
export default handleActions(
  {
    [SET_CHAT_HALL]: (state, { payload: user }) => ({
      ...state,
      user: {
        username: user.username,
        nickname: user.nickname,
        profileImage: user.profileImage,
      },
    }),
    [GET_GUEST_NUMBER_SUCCESS]: (state, { payload: guestInfo }) => ({
      ...state,
      user: {
        username: guestInfo,
        nickname: guestInfo,
        profileImage: null,
      },
    }),
    [GET_GUEST_NUMBER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      error: error,
    }),
    [SEND_MESSAGE]: (state, { payload: msg }) => ({
      ...state,
      msgList: [...state.msgList, { ...msg }],
    }),
    [RECEIVE_MESSAGE]: (state, { payload: msg }) => ({
      ...state,
      msgList: [...state.msgList, { ...msg }],
    }),
    [SET_USER_LIST]: (state, { payload: userList }) => ({
      ...state,
      userList: [...userList],
    }),
    [GET_USER_INFO_SUCCESS]: (state, { payload: userList }) => ({
      ...state,
      userList: [...userList],
    }),
    [GET_USER_INFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),
    [LEAVE_CHAT_HALL]: (state) => ({
      ...state,
      msgList: [],
    }),
    [SOMEONE_LEFT]: (state, { payload: username }) => ({
      ...state,
      userList: state.userList.filter((user) => user.username !== username),
    }),
    [SOMEONE_IN_OUT]: (state, { payload: { nickname, action } }) => ({
      ...state,
      msgList: [...state.msgList, { action, nickname }],
    }),
    [INITIALIZE_CHAT_HALL]: () => ({
      ...initialState,
    }),
  },
  initialState,
);
