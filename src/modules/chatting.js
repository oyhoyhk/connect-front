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
const [
  REQUEST_CHATTING_LOGS,
  REQUEST_CHATTING_LOGS_SUCCESS,
  REQUEST_CHATTING_LOGS_FAILURE,
] = createRequestActionTypes('chatting/REQUEST_CHATTING_LOGS');

export const setOtherToChat = createAction(SET_OTHER_TO_CHAT);
export const initializeOther = createAction(INITIALIZE_OTHER);
export const sendChatting = createAction(SEND_CHATTING);
export const receiveChatting = createAction(RECEIVE_CHATTING);
export const openChatting = createAction(OPEN_CHATTING);
export const closeChatting = createAction(CLOSE_CHATTING);
export const requestChattingLogs = createAction(REQUEST_CHATTING_LOGS);
const requestChattingLogsSaga = createRequestSaga(
  REQUEST_CHATTING_LOGS,
  chattingAPI.requestChattingLogs,
);

export function* chattingSaga() {
  yield takeLatest(REQUEST_CHATTING_LOGS, requestChattingLogsSaga);
}

const initialState = {
  other: null,
  logs: {},
  chat: false,
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
    [SEND_CHATTING]: (state, { payload: { receiver, message, time } }) => {
      if (!state.logs[receiver]) state.logs[receiver] = [];

      return {
        ...state,
        logs: {
          ...state.logs,
          [receiver]: [
            ...state.logs[receiver],
            { msg: message, type: 'send', time },
          ],
        },
      };
    },
    [RECEIVE_CHATTING]: (state, { payload: { sender, message, time } }) => {
      if (!state.logs[sender]) state.logs[sender] = [];
      return {
        ...state,
        logs: {
          ...state.logs,
          [sender]: [
            ...state.logs[sender],
            { msg: message, sender, type: 'received', time },
          ],
        },
      };
    },
    [OPEN_CHATTING]: (state) => ({ ...state, chat: true }),
    [CLOSE_CHATTING]: (state) => ({
      ...state,
      chat: false,
      other: null,
    }),
    [REQUEST_CHATTING_LOGS_SUCCESS]: (state, { payload: { other, list } }) => ({
      ...state,
      logs: {
        ...state.logs,
        [other]: [...list],
      },
    }),
  },
  initialState,
);
