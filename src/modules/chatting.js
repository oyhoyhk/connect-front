import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as chattingAPI from '../lib/api/chatting';

const SET_OTHER_TO_CHAT = 'chatting/SET_OTHER_TO_CHAT';
const INITIALIZE_OTHER = 'chatting/INITIALIZE_OTHER';
const SEND_CHATTING = 'chatting/SEND_CHATTING';
const RECEIVE_CHATTING = 'chatting/RECEIVE_CHATTING';
const OPEN_CHATTING = 'chatting/OPEN_CHATTING';
const CLOSE_CHATTING = 'chatting/CLOSE_CHATTING';
const START_LOADING = 'chatting/START_LOADING';

const [
  REQUEST_CHATTING_LOGS,
  REQUEST_CHATTING_LOGS_SUCCESS,
  REQUEST_CHATTING_LOGS_FAILURE,
] = createRequestActionTypes('chatting/REQUEST_CHATTING_LOGS');
const [
  REQUEST_CHATTING_LIST,
  REQUEST_CHATTING_LIST_SUCCESS,
  REQUEST_CHATTING_LIST_FAILURE,
] = createRequestActionTypes('chatting/REQUEST_CHATTING_LIST');

export const setOtherToChat = createAction(SET_OTHER_TO_CHAT);
export const initializeOther = createAction(INITIALIZE_OTHER);
export const sendChatting = createAction(SEND_CHATTING);
export const receiveChatting = createAction(RECEIVE_CHATTING);
export const openChatting = createAction(OPEN_CHATTING);
export const closeChatting = createAction(CLOSE_CHATTING);
export const requestChattingLogs = createAction(REQUEST_CHATTING_LOGS);
export const requestChattingList = createAction(REQUEST_CHATTING_LIST);
export const startLoading = createAction(START_LOADING);

const requestChattingLogsSaga = createRequestSaga(
  REQUEST_CHATTING_LOGS,
  chattingAPI.requestChattingLogs,
);

const requestChattingListSaga = createRequestSaga(
  REQUEST_CHATTING_LIST,
  chattingAPI.requestChattingList,
);

export function* chattingSaga() {
  yield takeLatest(REQUEST_CHATTING_LOGS, requestChattingLogsSaga);
  yield takeLatest(REQUEST_CHATTING_LIST, requestChattingListSaga);
}

const initialState = {
  other: null,
  logs: [],
  chat: false,
  chattingList: [],
  loading: false,
  newMessages: 0,
};

export default handleActions(
  {
    [SET_OTHER_TO_CHAT]: (state, { payload: other }) => ({
      ...state,
      other,
    }),
    [INITIALIZE_OTHER]: (state) => ({
      ...state,
      other: null,
    }),
    [SEND_CHATTING]: (state, { payload: { message, time } }) => {
      return {
        ...state,
        logs: [...state.logs, { msg: message, type: 'send', time }],
      };
    },
    [RECEIVE_CHATTING]: (state, { payload: result }) => ({
      ...state,
      chattingList: [...result],
      newMessages: result.reduce((a, c) => (a += c.new_messages), 0),
    }),
    [OPEN_CHATTING]: (state) => ({ ...state, chat: true }),
    [CLOSE_CHATTING]: (state) => ({
      ...state,
      chat: false,
      other: null,
      logs: [],
    }),
    [REQUEST_CHATTING_LOGS_SUCCESS]: (state, { payload: list }) => ({
      ...state,
      logs: [...list],
      loading: false,
    }),
    [REQUEST_CHATTING_LOGS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [REQUEST_CHATTING_LIST_SUCCESS]: (state, { payload: list }) => ({
      ...state,
      chattingList: [...list],
      newMessages: list.reduce((a, c) => (a += c.new_messages), 0),
    }),
    [REQUEST_CHATTING_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [START_LOADING]: (state) => ({
      ...state,
      loading: true,
    }),
  },
  initialState,
);
