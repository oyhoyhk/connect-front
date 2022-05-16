import { createAction, handleActions } from 'redux-actions';
import * as authAPI from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const INITIALIZE_TEMP_INFO = 'auth/INITIALIZE_TEMP_INFO';
const SET_TEMP_INFO = 'auth/SET_TEMP_INFO';
const REMOVE_AUTH = 'auth/REMOVE_AUTH';
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes('auth/REGISTER');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('auth/LOGIN');
const [DUPLICATE_CHECK, DUPLICATE_CHECK_SUCCESS, DUPLICATE_CHECK_FAILURE] =
  createRequestActionTypes('auth/DUPLICATE_CHECK');

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  }),
);
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);
export const initializeTempInfo = createAction(
  INITIALIZE_TEMP_INFO,
  ({ username, password }) => ({ username, password }),
);
export const setTempInfo = createAction(SET_TEMP_INFO, (type, value) => ({
  type,
  value,
}));
export const register = createAction(REGISTER, (formData) => {
  return {
    formData,
  };
});
export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));

export const duplicateCheck = createAction(DUPLICATE_CHECK, ({ username }) => ({
  username,
}));
export const removeAuth = createAction(REMOVE_AUTH);

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const duplicateCheckSaga = createRequestSaga(
  DUPLICATE_CHECK,
  authAPI.duplicateCheck,
);
export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(DUPLICATE_CHECK, duplicateCheckSaga);
}

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
  tempInfo: {
    username: '',
    password: '',
    nickname: null,
    profileImage: null,
  },
  auth: null,
  authError: null,
  isDuplicate: null,
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) => {
      const target = state[form];
      return {
        ...state,
        [form]: {
          ...target,
          [key]: value,
        },
      };
    },
    [INITIALIZE_FORM]: (state, { form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    [INITIALIZE_TEMP_INFO]: (state, { payload: { username, password } }) => {
      return {
        ...state,
        tempInfo: {
          username,
          password,
          nickname: null,
          profileImage: null,
        },
      };
    },
    [SET_TEMP_INFO]: (state, { payload: { type, value } }) => ({
      ...state,
      tempInfo: {
        ...state.tempInfo,
        [type.type]: type.value,
      },
    }),
    [REGISTER_SUCCESS]: (state, action) => {
      console.log(action);
      return {
        ...state,
        authError: null,
        auth: { ...action.payload },
      };
    },
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [DUPLICATE_CHECK_SUCCESS]: (state, { payload: result }) => {
      console.log(result);
      return {
        ...state,
        isDuplicate: result === 1 ? true : false,
      };
    },
    [DUPLICATE_CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [REMOVE_AUTH]: (state) => ({
      ...state,
      auth: null,
    }),
  },
  initialState,
);

export default auth;
