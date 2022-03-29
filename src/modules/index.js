import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import { all } from 'redux-saga/effects';
import loading from './loading';
import user, { userSaga } from './user';
import chatHall, { chatHallSaga } from './chatHall';
import friends, { friendsSaga } from './friends';
const rootReducer = combineReducers({
  auth,
  loading,
  user,
  chatHall,
  friends,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), chatHallSaga(), friendsSaga()]);
}

export default rootReducer;
