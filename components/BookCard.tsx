import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import colors from "@config/colors";
import React from "react";

interface BookCardProps {
  title: string;
  releaseDate: string;
  cover: string;
  onPress: () => void;
}

const BookCard = ({ title, releaseDate, cover, onPress }: BookCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: cover }}
        style={styles.cover}
        resizeMode="contain"
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{releaseDate}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 8,
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
    marginBottom: 2,
    color: colors.black,
  },
  date: {
    color: colors.darkMedium,
    fontSize: 12,
  },
});

export default BookCard;
