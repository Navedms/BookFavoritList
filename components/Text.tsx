import React from "react";
import { Text, TextStyle } from "react-native";

import defaultStyle from "../config/style";
import useColors from "@hooks/useColors";

interface AppText {
  children: string;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number;
}

function AppText({ children, style, ...otherProps }: AppText) {
  const colors = useColors();
  return (
    <Text
      style={[defaultStyle.text, { color: colors.black }, style]}
      {...otherProps}
    >
      {children}
    </Text>
  );
}

export default AppText;
