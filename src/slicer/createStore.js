import createSagaMiddle from "@redux-saga/core";
import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";

import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddle();

export const middlewares = [thunk, sagaMiddleware];

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

// eslint-disable-next-line
export default {
  store,
  persistor,
};
