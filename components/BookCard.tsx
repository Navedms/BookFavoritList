import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import useColors from "@hooks/useColors";
import Text from "./Text";
import showOk from "./ShowMessage/showOk";
import { listType } from "@store/filters/filtersSlice";
import { addFavorite, Book, removeFavorite } from "@store/books/booksSlice";

interface BookCardProps {
  title: string;
  releaseDate: string;
  cover: string;
  onPress?: () => void;
  forceListType?: listType;
  description?: string;
  showFavoritesHandler?: boolean;
  book?: Book;
}

const BookCard = ({
  title,
  releaseDate,
  cover,
  onPress,
  forceListType,
  description,
  showFavoritesHandler = false,
  book,
}: BookCardProps) => {
  const listType = useSelector((state: any) => state.filters.listType);
  const favorites = useSelector((state: any) => state.books.favorites);
  const isFavorite = favorites?.find((b: any) => b.title === title);
  const dispatch = useDispatch();

  const colors = useColors();

  const listTypeToUse = forceListType || listType;

  // handle
  const handleFavorite = () => {
    if (isFavorite) {
      book && dispatch(removeFavorite(book));
      showOk("Removed from favorites", colors.delete);
    } else {
      book && dispatch(addFavorite(book));
      showOk("Added to favorites", colors.ok);
    }
  };

  // render
  if (listTypeToUse === "list") {
    return (
      <TouchableOpacity
        style={[styles.listItem, { backgroundColor: colors.light }]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.listItemContainer}>
          <Image
            source={{ uri: cover }}
            style={styles.listCover}
            resizeMode="contain"
          />
          <Text
            numberOfLines={2}
            style={[styles.listTitle, { color: colors.black }]}
          >
            {title}
          </Text>
          <View style={styles.listDate}>
            <Text style={[styles.listDateText, { color: colors.darkMedium }]}>
              {releaseDate}
            </Text>
            {showFavoritesHandler && !!book && (
              <TouchableOpacity onPress={handleFavorite} style={styles.iconBtn}>
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={28}
                  color={isFavorite ? colors.delete : colors.darkMedium}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {description && (
          <Text
            numberOfLines={4}
            style={[styles.listDescription, { color: colors.dark }]}
          >
            {description}
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.light, borderColor: colors.medium },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: cover }}
        style={styles.cover}
        resizeMode="contain"
      />
      <Text numberOfLines={3} style={styles.title}>
        {title}
      </Text>
      <Text style={[styles.date, { color: colors.darkMedium }]}>
        {releaseDate}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: "center",
    margin: 8,
    height: 260,
    width: "90%",
  },
  cover: {
    width: "100%",
    height: 150,
    marginBottom: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
  },
  listItem: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 0,
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  listDescription: {
    flex: 1,
    fontSize: 12,
    marginTop: 12,
  },
  iconBtn: {
    paddingTop: 4,
    alignSelf: "flex-end",
  },
  listCover: {
    width: 60,
    height: 90,
    marginRight: 14,
  },
  listTitle: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 2,
    textAlign: "left",
  },
  listDate: {
    marginLeft: 8,
    alignSelf: "flex-start",
  },
  listDateText: {
    fontSize: 13,
  },
});

export default BookCard;
