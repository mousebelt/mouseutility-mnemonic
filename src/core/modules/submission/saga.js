import {
  put,
  call,
  fork,
  all,
  take,
} from 'redux-saga/effects';

import {
} from './actions';

import { RestService } from '../../../services';

export default function* () {
  yield all([
    //fork(watchSubmissionRequest),
  ]);
}
