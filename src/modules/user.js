import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';

import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
  createRequestActionTypes('user/CHECK');
const [MODIFY_INFO, MODIFY_INFO_SUCCESS, MODIFY_INFO_FAILURE] =
  createRequestActionTypes('user/MODIFY_INFO');

const LOGOUT = 'user/LOGOUT';
const TEMP_SET_USER = 'user/TEMP_SET_USER';

export const tempSetUser = createAction(TEMP_SET_USER);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);
export const modifyInfo = createAction(MODIFY_INFO, (formData) => ({
  formData,
}));

const checkSaga = createRequestSaga(CHECK, authAPI.check);
const modifyInfoSaga = createRequestSaga(MODIFY_INFO, authAPI.modify);

function checkFailureSaga() {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.log('localStorage is not working');
  }
}

function* logoutSaga({ payload: { uid } }) {
  try {
    yield call(authAPI.logout, uid);
    localStorage.removeItem('user');
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(MODIFY_INFO, modifyInfoSaga);
}

const initialState = {
  user: null,
  checkError: null,
};

export default handleActions(
  {
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user: user,
    }),
    [MODIFY_INFO_SUCCESS]: (state, { payload: user }) => {
      localStorage.setItem('user', JSON.stringify(user));
      return {
        ...state,
        user,
      };
    },
    [MODIFY_INFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);
