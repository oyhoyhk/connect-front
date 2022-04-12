import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const SET_OTHER_TO_CHAT = 'chatting/SET_OTHER_TO_CHAT';
const INITIALIZE_OTHER = 'chatting/INITIALIZE_OTHER';
const SEND_CHATTING = 'chatting/SEND_CHATTING';
const RECEIVE_CHATTING = 'chatting/RECEIVE_CHATTING';

export const setOtherToChat = createAction(SET_OTHER_TO_CHAT);
export const initializeOther = createAction(INITIALIZE_OTHER);
export const sendChatting = createAction(SEND_CHATTING);
export const receiveChatting = createAction(RECEIVE_CHATTING);

const initialState = {
  other: null,
  logs: {},
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
            { message, type: 'send', time },
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
            { message, sender, type: 'received', time },
          ],
        },
      };
    },
  },
  initialState,
);
