import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Switch, StyleSheet } from "react-native";
import { toggleTheme } from "@store/theme/themeSlice";
import useColors from "@hooks/useColors";
import { StatusBar } from "expo-status-bar";

const DarkModeSwitch = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: any) => state.theme.mode);
  const colors = useColors();
  const isDark = mode === "dark";
  return (
    <View style={styles.row}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Text style={[styles.label, { color: colors.black }]}>Dark mode:</Text>
      <Switch
        value={isDark}
        onValueChange={() => dispatch(toggleTheme())}
        trackColor={{ false: colors.medium, true: colors.primary }}
        thumbColor={colors.white}
        ios_backgroundColor={colors.medium}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  label: {
    fontSize: 16,
    marginRight: 12,
    fontWeight: "500",
  },
});

export default DarkModeSwitch;
