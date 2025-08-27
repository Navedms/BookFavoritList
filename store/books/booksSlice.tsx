import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Book {
  number: number;
  title: string;
  originalTitle: string;
  releaseDate: string;
  description: string;
  pages: number;
  cover: string;
  index: number;
}

export interface BooksState {
  books: Book[];
  lastFetched: number | null;
  currentBookIndex: number;
  favorites: Book[];
}

const initialState: BooksState = {
  books: [],
  lastFetched: null,
  currentBookIndex: -1,
  favorites: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (
      state,
      { payload }: PayloadAction<{ books: Book[]; lastFetched: number }>
    ) => {
      state.books = payload.books;
      state.lastFetched = payload.lastFetched;
    },
    clearBooks: (state) => {
      state.books = [];
      state.lastFetched = null;
    },
    setBookIndex: (state, { payload }: PayloadAction<number>) => {
      state.currentBookIndex = payload;
    },
    addFavorite: (state, { payload }: PayloadAction<Book>) => {
      state.favorites.push(payload);
    },
    removeFavorite: (state, { payload }: PayloadAction<Book>) => {
      state.favorites = state.favorites.filter(
        (b: Book) => b.title !== payload.title
      );
    },
  },
});

export const {
  setBooks,
  clearBooks,
  setBookIndex,
  addFavorite,
  removeFavorite,
} = booksSlice.actions;
export default booksSlice.reducer;
