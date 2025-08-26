import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import Activityindicator from "@components/Activityindicator";
import NoResults from "@components/NoResults";
import Screen from "@components/Screen";
import BookCard from "@components/BookCard";
import routes from "@navigation/routes";
import colors from "@config/colors";
import Text from "@components/Text";
import { useBooks } from "@api/books";
import { Book, setBookIndex } from "@store/books/booksSlice";
import { FlashList } from "@shopify/flash-list";

interface Props {
  navigation: any;
}

function BooksScreen({ navigation }: Props) {
  //state (redux)
  const dispatch = useDispatch();

  // APIs
  // api call and store on redux
  const { data: books, isLoading, error } = useBooks();

  // Handles
  const handleBookPress = (index: number) => {
    dispatch(setBookIndex(index));
    navigation.navigate(routes.BOOK_DETAILS.name);
  };

  // render
  return (
    <Screen>
      <Activityindicator visible={isLoading} />
      {!books?.length && !isLoading ? (
        <NoResults
          title={"No results found"}
          text="Sorry, that filter combination has no reaults..."
          iconName="home-city"
        />
      ) : (
        <View style={styles.grid}>
          <FlashList
            data={books}
            numColumns={3}
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
          <Text style={styles.error}>{error}</Text>
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
    color: colors.delete,
    textAlign: "center",
  },
});

export default BooksScreen;
