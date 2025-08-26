import type { RootState } from "../store";
import type { Sort } from "../filtersSlice";
// Selector to get filtered and sorted books
// Accepts: books array, search string, sort object
export function getFilteredBooks(
  books: Book[],
  search: string,
  sort: Sort
): Book[] {
  let filtered = books;
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      (book: Book) =>
        book.title.toLowerCase().includes(s) ||
        book.description.toLowerCase().includes(s)
    );
  }
  if (sort) {
    filtered = [...filtered].sort((a, b) => {
      let aValue: any;
      let bValue: any;
      switch (sort.sorttype) {
        case "name":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "pages":
          aValue = a.pages;
          bValue = b.pages;
          break;
        case "releaseDate":
          aValue = new Date(a.releaseDate).getTime();
          bValue = new Date(b.releaseDate).getTime();
          break;
        default:
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
      }
      if (aValue < bValue) return sort.sortdirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sort.sortdirection === "asc" ? 1 : -1;
      return 0;
    });
  }
  return filtered;
}
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
}

const initialState: BooksState = {
  books: [],
  lastFetched: null,
  currentBookIndex: -1,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (
      state,
      action: PayloadAction<{ books: Book[]; lastFetched: number }>
    ) => {
      state.books = action.payload.books;
      state.lastFetched = action.payload.lastFetched;
    },
    clearBooks: (state) => {
      state.books = [];
      state.lastFetched = null;
    },
    setBookIndex: (state, action: PayloadAction<number>) => {
      state.currentBookIndex = action.payload;
    },
  },
});

export const { setBooks, clearBooks, setBookIndex } = booksSlice.actions;
export default booksSlice.reducer;
