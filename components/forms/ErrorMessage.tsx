import React from "react";
import { StyleSheet } from "react-native";

import useColors from "@hooks/useColors";
import Text from "../Text";

interface ErrorMessageProps {
  error: string;
  visible: boolean;
  style?: any;
}

function ErrorMessage({ error, visible, style }: ErrorMessageProps) {
  const colors = useColors();
  if (!visible || !error) return null;

  return (
    <Text style={[styles.error, { color: colors.delete }, style]}>{error}</Text>
  );
}

const styles = StyleSheet.create({
  error: {
    textAlign: "center",
  },
});

export default ErrorMessage;
