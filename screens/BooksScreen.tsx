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
import { useBooks } from "@api/books";
import { Book, setBookIndex } from "@store/books/booksSlice";
import { FlashList } from "@shopify/flash-list";
import {
  defaultFilters,
  listType,
  onFilter,
  setListType,
} from "@store/filters/filtersSlice";

interface Props {
  navigation: any;
}

function BooksScreen({ navigation }: Props) {
  //state (redux)
  const filters = useSelector((state: any) => state.filters.filters);
  const filteredList = useSelector((state: any) => state.filters.filteredList);
  const listType = useSelector((state: any) => state.filters.listType);
  const dispatch = useDispatch();
  const colors = useColors();

  // APIs
  // api call and store on redux
  const { data: books, isLoading, error } = useBooks();

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

  const handleGridListToggle = (type: listType) => {
    dispatch(setListType(type));
  };

  const handleBookPress = (index: number) => {
    dispatch(setBookIndex(index));
    navigation.navigate(routes.BOOK_DETAILS.name);
  };

  const handleFilters = (selectedFilters: SelectedFilters) => {
    dispatch(onFilter({ ...selectedFilters, books }));
  };

  const handleResetFilters = () => {
    const tempFilters = {
      sort: defaultFilters.sort,
      filters: { ...filters.filters, unit: defaultFilters.filters.unit },
    };
    dispatch(onFilter({ ...tempFilters, books }));
  };

  const handleSearchChangeText = (text: string) => {
    const tempFilters = {
      ...filters,
      filters: { ...filters.filters, text: text },
    };
    dispatch(onFilter({ ...tempFilters, books }));
  };

  const handleSearchRemoveText = () => {
    const tempFilters = {
      ...filters,
      filters: { ...filters.filters, text: "" },
    };
    dispatch(onFilter({ ...tempFilters, books }));
  };

  //
  useEffect(() => {
    if (books?.length > 0) {
      handleFilters(filters);
    }
  }, [books]);

  // render
  return (
    <Screen>
      <Activityindicator visible={isLoading} />
      <Filters
        onGridListToggle={handleGridListToggle}
        onSetFilters={handleFilters}
        onResetFilters={handleResetFilters}
        firstData={filtersSortData}
        defaultFilters={defaultFilters}
        search={searchData}
      />
      {!filteredList?.length && !isLoading ? (
        <NoResults
          title={"No results found"}
          text="Sorry, that filter combination has no reaults..."
          iconName="book-open-page-variant-outline"
        />
      ) : (
        <View style={styles.grid}>
          <FlashList
            data={filteredList}
            estimatedItemSize={10}
            numColumns={listType === "grid" ? 3 : 1}
            keyExtractor={(item: Book) => item.title.toString()}
            refreshing={isLoading}
            renderItem={({ item, index }) => (
              <BookCard
                key={item.title?.toString()}
                cover={item.cover}
                title={item.title}
                releaseDate={item.releaseDate}
                onPress={() => handleBookPress(index)}
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

export default BooksScreen;
