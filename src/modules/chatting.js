import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const SET_OTHER_TO_CHAT = 'chatting/SET_OTHER_TO_CHAT';
const INITIALIZE_OTHER = 'chatting/INITIALIZE_OTHER';
export const setOtherToChat = createAction(SET_OTHER_TO_CHAT);
export const initializeOther = createAction(INITIALIZE_OTHER);

const initialState = {
  other: null,
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
  },
  initialState,
);
