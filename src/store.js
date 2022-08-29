/* eslint-disable no-param-reassign */
const { configureStore } = require("@reduxjs/toolkit");
const { setupListeners } = require("@reduxjs/toolkit/dist/query");
const storage = require("redux-persist/lib/storage");
const thunk = require("redux-thunk");
const { combineReducers } = require("redux");
const { persistReducer } = require("redux-persist");
const { version } = require("../package.json");
const baseApi = require('./services/base')

const reducers = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistConfig = {
  key: "root",
  storage: storage.default,
  version,
  whitelist: [
    // Don't persist the API reducer
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk.default, baseApi.middleware],
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

module.exports = store;
