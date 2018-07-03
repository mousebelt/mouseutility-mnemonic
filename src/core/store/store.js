/* globals window */
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import sagas from './sagas';
import {loadState, saveState} from "../../services/localStorage";
import rootReducer from './reducers';
import {throttle} from "lodash";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  thunk,
  sagaMiddleware,
];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger());
}

const enhancers = [
  applyMiddleware(...middlewares), // empty for now;
];

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
/* eslint-enable */

const store = createStore(
  rootReducer,
  composeEnhancers(...enhancers),
);

sagaMiddleware.run(sagas);
store.subscribe(throttle(() => saveState(store.getState()), 1000));
export default store

