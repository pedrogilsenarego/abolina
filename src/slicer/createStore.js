import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddle from "@redux-saga/core";
import { persistStore } from "redux-persist";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddle();

export const middlewares = [thunk, sagaMiddleware, logger];

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
