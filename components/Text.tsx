import React from "react";
import { Text, TextStyle } from "react-native";

import defaultStyle from "../config/style";

interface AppText {
  children: string;
  style?: TextStyle;
  numberOfLines?: number;
}

function AppText({ children, style, ...otherProps }: AppText) {
  return (
    <Text style={[defaultStyle.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;
