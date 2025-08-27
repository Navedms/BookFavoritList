import { configureStore, combineReducers } from "@reduxjs/toolkit";
import booksReducer from "./books/booksSlice";
import filtersReducer from "./filters/filtersSlice";
import themeReducer from "./theme/themeSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["books", "theme"],
};

const createReducer = combineReducers({
  books: booksReducer,
  filters: filtersReducer,
  theme: themeReducer,
});

const reducers = persistReducer(persistConfig, createReducer);
export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
