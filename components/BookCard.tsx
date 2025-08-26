import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import useColors from "@hooks/useColors";
import Text from "./Text";
import { useSelector } from "react-redux";

interface BookCardProps {
  title: string;
  releaseDate: string;
  cover: string;
  onPress?: () => void;
}

const BookCard = ({ title, releaseDate, cover, onPress }: BookCardProps) => {
  const listType = useSelector((state: any) => state.filters.listType);
  const colors = useColors();

  if (listType === "list") {
    return (
      <TouchableOpacity
        style={[styles.listItem, { backgroundColor: colors.light }]}
        onPress={onPress}
        activeOpacity={0.8}
      >
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
        <Text style={[styles.listDate, { color: colors.darkMedium }]}>
          {releaseDate}
        </Text>
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
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 0,
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
    fontSize: 13,
    marginLeft: 8,
    alignSelf: "flex-start",
  },
});

export default BookCard;
