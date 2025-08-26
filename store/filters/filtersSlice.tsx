import { SelectedFilters } from "@components/forms/Filters";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "@store/books/booksSlice";

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

export const defaultFilters: SelectedFilters = {
  filters: {
    text: "",
    listType: "grid",
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
}

const initialState: FiltersState = {
  filters: defaultFilters,
  loading: false,
  filteredList: [],
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
      action: PayloadAction<
        SelectedFilters & { books: Book[]; searchElements?: string[] }
      >
    ) {
      state.loading = true;
      state.filters = action.payload;
      state.filteredList = getFilteredBooks(
        action.payload.books,
        action.payload.sort,
        action.payload.filters.text,
        action.payload.searchElements
      );
      state.loading = false;
    },
  },
});

export const { onFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
