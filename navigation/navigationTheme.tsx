import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { lightColors, darkColors } from "@config/colors";

export const getNavigationTheme = (mode: "light" | "dark") => {
  if (mode === "dark") {
    return {
      ...DarkTheme,
      colors: {
        ...DarkTheme.colors,
        primary: darkColors.primary,
        text: darkColors.black,
        background: darkColors.background,
        card: darkColors.light,
        border: darkColors.medium,
      },
    };
  }
  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: lightColors.primary,
      text: lightColors.black,
      background: lightColors.background,
      card: lightColors.light,
      border: lightColors.medium,
    },
  };
};
