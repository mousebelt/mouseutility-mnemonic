// @flow

import { fork, all } from 'redux-saga/effects';
import {
  submissionSaga
} from '../modules';

export default function* rootSaga() {
  yield all([
    fork(submissionSaga),
  ]);
}
