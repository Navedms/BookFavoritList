import { SelectedFilters } from "@components/forms/Filters";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { Book } from "@store/books/booksSlice";

import customParseFormat from "dayjs/plugin/customParseFormat.js";

dayjs.extend(customParseFormat);

export function getFilteredBooks(
  books: Book[],
  sort: Sort,
  search: string,
  searchElements: string[] = ["title"] // "description"
): Book[] {
  let filtered = books;
  if (search && searchElements.length > 0) {
    const s = search.toLowerCase();
    filtered = filtered.filter((book: Book) =>
      searchElements.some((field) => {
        const value = (book as any)[field];
        return typeof value === "string" && value.toLowerCase().includes(s);
      })
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
          aValue = dayjs(a.releaseDate, "MMM D, YYYY").valueOf();
          bValue = dayjs(b.releaseDate, "MMM D, YYYY").valueOf();
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

export const defaultFilters: SelectedFilters = {
  filters: {
    text: "",
  },
  sort: {
    sorttype: "name",
    sortdirection: "asc",
  },
};

interface FiltersState {
  filters: SelectedFilters;
  loading: boolean;
  filteredList: Book[];
  listType: listType;
}

const initialState: FiltersState = {
  filters: defaultFilters,
  loading: false,
  filteredList: [],
  listType: "grid",
};

export type sortType = "name" | "pages" | "releaseDate";
export type sortDirection = "asc" | "desc";
export type listType = "grid" | "list";

export interface Sort {
  sorttype: sortType;
  sortdirection: sortDirection;
}

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    onFilter(
      state,
      {
        payload,
      }: PayloadAction<
        SelectedFilters & { books: Book[]; searchElements?: string[] }
      >
    ) {
      state.loading = true;
      state.filters = payload;
      state.filteredList = getFilteredBooks(
        payload.books,
        payload.sort,
        payload.filters.text,
        payload.searchElements
      );
      state.loading = false;
    },
    setListType(state, { payload }: PayloadAction<listType>) {
      state.listType = payload;
    },
  },
});

export const { onFilter, setListType } = filtersSlice.actions;
export default filtersSlice.reducer;
