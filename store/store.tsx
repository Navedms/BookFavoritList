import { configureStore, combineReducers } from "@reduxjs/toolkit";
import booksReducer from "./books/booksSlice";
import favoritesReducer from "./favorites/favoritesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["favorites", "books"],
};

const createReducer = combineReducers({
  books: booksReducer,
  favorites: favoritesReducer,
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
