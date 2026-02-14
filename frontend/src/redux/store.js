import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authslice from "./authslice.js"
import jobslice from "./jobslice.js";
import companyslice from "./companyslice.js";
import {persistReducer,
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,} from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : {
        getItem: () => Promise.resolve(null),
        setItem: (_key, value) => Promise.resolve(value),
        removeItem: () => Promise.resolve(),
      };
const persistConfig={
    key:"root",
    storage,
    whitelist:["auth"]
}

const rootReducer=combineReducers({
    auth:authslice,
    job:jobslice,
    company:companyslice,
})
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})
export default store; 


