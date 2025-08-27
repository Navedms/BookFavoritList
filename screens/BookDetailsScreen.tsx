import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { addFavorite, removeFavorite } from "@store/books/booksSlice";
import useColors from "@hooks/useColors";
import showOk from "@components/ShowMessage/showOk";

const BookDetailsScreen = () => {
  // store
  const dispatch = useDispatch();
  const currentBookIndex = useSelector(
    (state: any) => state.books.currentBookIndex
  );
  const book = useSelector(
    (state: any) => state.filters.filteredList[currentBookIndex]
  );
  const favorites = useSelector((state: any) => state.books.favorites);
  const isFavorite = favorites?.find(
    (b: any) => b.title === book?.title && b.number === book?.number
  );

  // style
  const colors = useColors();

  // handle
  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(book));
      showOk("Removed from favorites", colors.delete);
    } else {
      dispatch(addFavorite(book));
      showOk("Added to favorites", colors.ok);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: colors.black }]}>
          {book.title}
        </Text>
        <TouchableOpacity onPress={handleFavorite} style={styles.iconBtn}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={28}
            color={isFavorite ? colors.delete : colors.darkMedium}
          />
        </TouchableOpacity>
      </View>
      <Text style={[styles.releaseDate, { color: colors.darkMedium }]}>
        {book.releaseDate}
      </Text>
      <Image
        source={{ uri: book.cover }}
        style={[styles.cover, { backgroundColor: colors.light }]}
        resizeMode="contain"
      />
      <Text style={[styles.description, { color: colors.dark }]}>
        {book.description}
      </Text>
      <Text style={[styles.pages, { color: colors.black }]}>
        Pages: {book.pages}
      </Text>
    </View>
  );
};

export default BookDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    marginRight: 10,
  },
  iconBtn: {
    padding: 4,
    width: "10%",
  },
  releaseDate: {
    fontSize: 14,
    marginBottom: 26,
  },
  cover: {
    padding: 20,
    width: "100%",
    height: 220,
    borderRadius: 8,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  pages: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
