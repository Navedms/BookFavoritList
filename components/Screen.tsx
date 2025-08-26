import React from "react";
import Constants from "expo-constants";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";

import useColors from "@hooks/useColors";

interface ScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

function Screen({ children, style, onPress }: ScreenProps) {
  const colors = useColors();
  const backgroundColor = colors.background;
  return (
    <View style={[styles.screen, { backgroundColor: backgroundColor }, style]}>
      {onPress ? (
        <TouchableWithoutFeedback onPress={onPress}>
          <View
            style={[styles.view, { backgroundColor: backgroundColor }, style]}
          >
            {children}
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View
          style={[styles.view, { backgroundColor: backgroundColor }, style]}
        >
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
