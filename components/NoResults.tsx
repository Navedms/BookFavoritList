import React, { ComponentProps } from "react";
import { View, StyleSheet } from "react-native";

import Text from "./Text";
import useColors from "@hooks/useColors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface NoResultsProps {
  title: string;
  text: string;
  iconName: ComponentProps<typeof MaterialCommunityIcons>["name"];
  iconColor?: string;
  flex?: boolean;
  button?: any;
}

function NoResults({
  title,
  text,
  iconName,
  iconColor = "dark",
  flex = true,
  button,
}: NoResultsProps) {
  const colors = useColors();
  return (
    <View style={[styles.container, flex && styles.fullScreen]}>
      {iconName && (
        <MaterialCommunityIcons
          name={iconName}
          size={48}
          style={styles.icon}
          color={colors[iconColor]}
        />
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.text, { color: colors.dark }]}>{text}</Text>
      {button && <View style={styles.btn}>{button}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    zIndex: 2,
    padding: 20,
  },
  fullScreen: {
    flexGrow: 1,
    zIndex: 0,
  },
  icon: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
  },
  text: {
    paddingTop: 2,
    fontSize: 16,
    textAlign: "center",
  },
  btn: {
    width: "90%",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NoResults;
