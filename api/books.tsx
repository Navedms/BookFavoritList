import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../store/books/booksSlice";
import { RootState } from "../store/store";
import { useEffect } from "react";

export function useBooks() {
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books.books);
  const lastFetched = useSelector(
    (state: RootState) => state.books.lastFetched
  );

  const query = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const now = Date.now();
      if (books.length > 0 && lastFetched && now - lastFetched < 86400000) {
        return books;
      }
      const res = await fetch(
        "https://potterapi-fedeperin.vercel.app/en/books"
      );
      if (!res.ok) throw new Error("Network response was not ok");
      const booksData = await res.json();
      dispatch(setBooks({ books: booksData, lastFetched: now }));
      return booksData;
    },
    initialData: books.length > 0 ? books : undefined,
  });

  useEffect(() => {
    if (books.length === 0) {
      query.refetch();
    }
  }, []);

  return query;
}
