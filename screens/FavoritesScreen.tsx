import React, { useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Activityindicator from "@components/Activityindicator";
import NoResults from "@components/NoResults";
import Screen from "@components/Screen";
import BookCard from "@components/BookCard";
import Filters, { SelectedFilters } from "@components/forms/Filters";
import routes from "@navigation/routes";
import useColors from "@hooks/useColors";
import Text from "@components/Text";
import { Book, setBookIndex } from "@store/books/booksSlice";
import { FlashList } from "@shopify/flash-list";
import {
  defaultFilters,
  onFilterFavorites,
  resetFilterFavorites,
} from "@store/filters/filtersSlice";

interface Props {
  navigation: any;
}

function FavoritesScreen({ navigation }: Props) {
  //state (redux)
  const favorites = useSelector((state: any) => state.books.favorites);
  const isLoading = useSelector((state: any) => state.filters.loading);
  const error = useSelector((state: any) => state.filters.error);
  const filters = useSelector((state: any) => state.filters.favoritesFilters);
  const books = useSelector((state: any) => state.filters.filteredList);
  const filteredFavorites = useSelector(
    (state: any) => state.filters.filteredFavorites
  );
  const dispatch = useDispatch();
  const colors = useColors();

  // Filters

  const filtersSortData = useMemo(
    () => [
      {
        type: "FormGroupPicker",
        id: `sortType-${filters.sort.sorttype}`,
        name: "sorttype",
        list: [
          {
            id: "name",
            value: "Book Title",
          },
          {
            id: "pages",
            value: "Pages",
          },
          {
            id: "releaseDate",
            value: "Date",
          },
        ],
        label: "Sort by:",
        value: filters.sort.sorttype,
        verticalElementInIT: {
          id: `sortDirection-${filters.sort.sortdirection}`,
          name: "sortdirection",
          list: [
            {
              id: "asc",
              value: "",
              icon: "chevron-up",
            },
            {
              id: "desc",
              value: "",
              icon: "chevron-down",
            },
          ],
          value: filters.sort.sortdirection,
        },
      },
    ],
    [filters]
  );

  const searchData = {
    firstValue: filters.filters.text,
    name: "text",
    onChangeCallBack: (text: string) => handleSearchChangeText(text),
    onRemoveValue: () => handleSearchRemoveText,
    placeholder: "Search by book title",
    icon: "book-search",
    disabled: false,
  };

  // Handles

  const handleBookPress = (index: number) => {
    const bookIndex = books.findIndex(
      (b: Book) =>
        b.title === filteredFavorites[index].title &&
        b.number === filteredFavorites[index].number
    );
    dispatch(setBookIndex(bookIndex));
    navigation.navigate(routes.BOOK_DETAILS.name);
  };

  const handleFilters = (selectedFilters: SelectedFilters) => {
    dispatch(onFilterFavorites({ ...selectedFilters, books: favorites }));
  };

  const handleResetFilters = () => {
    const tempFilters = {
      sort: defaultFilters.sort,
      filters: { ...filters.filters, unit: defaultFilters.filters.unit },
    };
    dispatch(onFilterFavorites({ ...tempFilters, books: favorites }));
  };

  const handleSearchChangeText = (text: string) => {
    const tempFilters = {
      ...filters,
      filters: { ...filters.filters, text: text },
    };
    dispatch(
      onFilterFavorites({
        ...tempFilters,
        books: favorites,
        searchElements: ["title", "description"],
      })
    );
  };

  const handleSearchRemoveText = () => {
    const tempFilters = {
      ...filters,
      filters: { ...filters.filters, text: "" },
    };
    dispatch(onFilterFavorites({ ...tempFilters, books: favorites }));
  };

  //
  useEffect(() => {
    if (favorites?.length > 0) {
      handleFilters(filters);
    } else {
      dispatch(resetFilterFavorites());
    }
  }, [favorites]);

  // render
  return (
    <Screen>
      <Activityindicator visible={isLoading} />
      <Filters
        onSetFilters={handleFilters}
        onResetFilters={handleResetFilters}
        firstData={filtersSortData}
        defaultFilters={defaultFilters}
        search={searchData}
      />
      {!filteredFavorites?.length && !isLoading ? (
        <NoResults
          title={"No results found"}
          text="The books you add to favorites will appear here..."
          iconName="book-open-page-variant-outline"
        />
      ) : (
        <View style={styles.grid}>
          <FlashList
            data={filteredFavorites}
            estimatedItemSize={10}
            numColumns={1}
            keyExtractor={(item: Book) => item.title.toString()}
            refreshing={isLoading}
            renderItem={({ item, index }) => (
              <BookCard
                forceListType="list"
                key={item.title?.toString()}
                cover={item.cover}
                title={item.title}
                releaseDate={item.releaseDate}
                onPress={() => handleBookPress(index)}
                description={item.description}
                showFavoritesHandler
                book={item}
              />
            )}
          />
        </View>
      )}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={[styles.error, { color: colors.delete }]}>{error}</Text>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: {
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 4,
    flex: 1,
  },
  errorContainer: {
    padding: 10,
    paddingBottom: 30,
    width: "100%",
  },
  error: {
    textAlign: "center",
  },
});

export default FavoritesScreen;
